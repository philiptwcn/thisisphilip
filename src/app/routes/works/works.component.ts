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
  caseCategories = [
    { label: 'Web & UI', category: 'web & ui' },
    { label: 'Graphics', category: 'graphic' },
    { label: 'Products', category: 'product' },
    { label: 'Photography', category: 'photography' },
  ];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getCases().then((result) => {
      this.cases = result;
    });
  }
}
