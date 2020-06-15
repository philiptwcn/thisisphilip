import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../core/services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.sass'],
})
export class WorksComponent implements OnInit {
  cases: Entry<any>[];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getCases().then((result) => {
      this.cases = result;
    });
  }
}
