import { Injectable } from "@angular/core";
import { ContentfulClientApi, Entry, Space, createClient } from "contentful";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

// change these to include your own settings
const CONFIG = {
  credentials: {
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    environment: environment.contentful.environmentId
  },

  contentTypeIds: {
    case: "case",
    about: "about"
  },
  fieldIds: {
    category: "category"
  }
};

@Injectable({
  providedIn: "root"
})
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.credentials.space,
    accessToken: CONFIG.credentials.accessToken,
    environment: CONFIG.credentials.environment
  });
  config: {
    space: string;
    accessToken: string;
    environment: string;
  };
  titleHandlers = [];

  constructor() {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = CONFIG.credentials;
    }

    this.titleHandlers = [];
    this.createClient();
    this.getSpace();
  }

  onTitleChange(fn): void {
    this.titleHandlers.push(fn);
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace().then(space => {
      this.titleHandlers.forEach(handler => handler(space.name));

      return space;
    });
  }

  // fetch cases
  getEntriesByType(typeId: string, query?: object) {
    return from(
      this.cdaClient.getEntries(
        Object.assign(
          {
            content_type: typeId,
            order: "-sys.createdAt,sys.id"
          },
          query
        )
      )
    ).pipe(map(res => res.items));
  }

  getEntryById(id: string) {
    return from(this.cdaClient.getEntry(id)).pipe(map(res => res));
  }

  // fetch categories
  getCategories(categories?: any) {
    return from(
      this.cdaClient.getEntries({
        content_type: CONFIG.contentTypeIds.case,
        query: categories
      })
    ).pipe(map(res => res.items));
  }

  // fetch cases by categories
  getEntriesByCategoryName(name: string) {
    return from(this.cdaClient.getEntries({ query: name })).pipe(
      map(res => res.items)
    );
    // return this.getCases({ 'fields.categories.sys.id': name });
  }

  // return a custom config if available
  getConfig(): { space: string; accessToken: string; environment: string } {
    return this.config !== CONFIG.credentials
      ? Object.assign({}, this.config)
      : { space: "", accessToken: "", environment: "" };
  }

  // set a new config and store it in localStorage
  setConfig(config: {
    space: string;
    accessToken: string;
    environment: string;
  }) {
    localStorage.setItem("catalogConfig", JSON.stringify(config));
    this.config = config;

    this.createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  // set config back to default values
  resetConfig() {
    localStorage.removeItem("catalogConfig");
    this.config = CONFIG.credentials;

    this.createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken,
      environment: this.config.environment
    });
  }
}
