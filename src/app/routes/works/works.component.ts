import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent } from "@angular/material/tabs";

import * as _ from "lodash";
import { Observable } from "rxjs";

import { ContentfulService } from "../../core/services/contentful.service";
import { WorkDialogComponent } from "./work-dialog.component";

export interface DialogData {
  // case: Entry<any>;
  id: string;
  isSpin: boolean;
}

@Component({
  selector: "app-works",
  templateUrl: "./works.component.html",
  styleUrls: ["./works.component.sass"]
})
export class WorksComponent implements OnInit {
  cases$: Observable<any>;
  caseCategories$: Observable<any>;
  caseCategories: string[];
  isSpin = false;

  constructor(
    private contentfulService: ContentfulService,
    public dialog: MatDialog
  ) {}
  openDialog(id: string): void {
    this.isSpin = true;
    setTimeout(() => {
      const dialogRef = this.dialog.open(WorkDialogComponent, {
        width: "80vw",
        data: { id }
      });

      dialogRef.afterOpened().subscribe(() => (this.isSpin = false));

      dialogRef.afterClosed().subscribe(() => {
        console.log("The dialog was closed");
      });
    }, 600);
  }
  tabSelectedTabChange($event: MatTabChangeEvent) {
    this.cases$ = this.contentfulService.getCasesByCategoryName(
      `${this.caseCategories[$event.index]}`
    );
  }
  ngOnInit(): void {
    this.caseCategories$ = this.contentfulService.getCategories();
    this.caseCategories$.subscribe(responses => {
      this.caseCategories = _.uniq(
        responses.reverse().map(response => response.fields.category)
      );
      console.log("this", this.caseCategories);
      this.cases$ = this.contentfulService.getCasesByCategoryName(
        this.caseCategories[0]
      );
    });
  }
}
