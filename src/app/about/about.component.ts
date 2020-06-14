import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../core/services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit {
  cases: Entry<any>[];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.contentfulService.getCases().then((result) => {
      this.cases = result;
    });
  }
}
