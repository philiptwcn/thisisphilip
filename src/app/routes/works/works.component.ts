import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.sass'],
})
export class WorksComponent implements OnInit {
  cases: Entry<any>[] = [];
  isAll: boolean;
  isGraphic = false;
  isProduct = false;
  isPhoto = false;
  isWeb = false;

  constructor(private contentfulService: ContentfulService) {}

  checkAll() {
    return (this.isAll = ![
      this.isGraphic,
      this.isPhoto,
      this.isProduct,
      this.isWeb,
    ].includes(true));
  }

  getCasesByCategoryName(category: string) {
    this.contentfulService
      .getCasesByCategoryName(category)
      .then((res) => (this.cases = res));
  }

  ngOnInit(): void {
    this.contentfulService.getCases().then((result) => {
      this.cases = result;
    });
  }
}
