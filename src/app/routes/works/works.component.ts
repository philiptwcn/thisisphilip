import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent } from "@angular/material/tabs";

import { Observable } from "rxjs";

import { ContentfulService } from "../../core/services/contentful.service";
import { WorkDialogComponent } from "./work-dialog.component";

export interface DialogData {
  // case: Entry<any>;
  id: string;
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

  constructor(
    private contentfulService: ContentfulService,
    public dialog: MatDialog
  ) {}
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(WorkDialogComponent, {
      width: "80vw",
      data: { id }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
    });
  }
  tabSelectedTabChange($event: MatTabChangeEvent) {
    this.cases$ = this.contentfulService.getEntriesByCategoryName(
      `${this.caseCategories[$event.index]}`
    );
  }
  ngOnInit(): void {
    this.caseCategories$ = this.contentfulService.getCategories();
    this.caseCategories$.subscribe(responses => {
      this.caseCategories = responses.map(response => response.fields.category);
      this.cases$ = this.contentfulService.getEntriesByCategoryName(
        this.caseCategories[0]
      );
    });
  }
}
