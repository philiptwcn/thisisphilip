import { Component, OnInit } from "@angular/core";

import { Entry } from "contentful";
import { Observable } from "rxjs";
import { ContentfulService } from "../../core/services/contentful.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.sass"]
})
export class AboutComponent implements OnInit {
  about$: Observable<any>;
  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.about$ = this.contentfulService.getEntriesByType("about");
  }
}
