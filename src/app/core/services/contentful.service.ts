import { Injectable } from '@angular/core';
import { createClient, Entry, Space, ContentfulClientApi } from 'contentful';

// change these to include your own settings
const CONFIG = {
  credentials: {
    space: 'lzkpvmwdzwc6',
    accessToken: 'cixMlBKtWoYGrYV6cADwNdAProGI9Fcq1QjBdW9G4QE',
  },

  contentTypeIds: {
    case: 'case',
    category: 'category',
    video: 'video',
  },
};

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.credentials.space,
    accessToken: CONFIG.credentials.accessToken,
  });
  config: {
    space: string;
    accessToken: string;
  };
  titleHandlers: Function[];

  constructor() {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = CONFIG.credentials;
    }

    this.titleHandlers = [];
    this._createClient();
    this.getSpace();
  }

  onTitleChange(fn): void {
    this.titleHandlers.push(fn);
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace().then((space) => {
      this.titleHandlers.forEach((handler) => handler(space.name));

      return space;
    });
  }

  // fetch cases
  getCases(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.case,
            order: '-sys.createdAt,sys.id',
          },
          query
        )
      )
      .then((res) => res.items);
  }

  // fetch cases with a given slug
  // and return one of them
  getCase(slug: string): Promise<Entry<any>> {
    return this.getCases({ 'fields.slug': slug }).then((items) => items[0]);
  }

  // fetch categories
  getCategories(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient
      .getEntries(
        Object.assign(
          {
            content_type: CONFIG.contentTypeIds.category,
          },
          query
        )
      )
      .then((res) => res.items);
  }

  // fetch cases by categories
  getCasesByCategoryName(name: string): Promise<Entry<any>[]> {
    return this.getCases({ 'fields.categories.sys.id': name });
  }

  // return a custom config if available
  getConfig(): { space: string; accessToken: string } {
    return this.config !== CONFIG.credentials
      ? Object.assign({}, this.config)
      : { space: '', accessToken: '' };
  }

  // set a new config and store it in localStorage
  setConfig(config: { space: string; accessToken: string }) {
    localStorage.setItem('catalogConfig', JSON.stringify(config));
    this.config = config;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  // set config back to default values
  resetConfig() {
    localStorage.removeItem('catalogConfig');
    this.config = CONFIG.credentials;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  _createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken,
    });
  }
}
