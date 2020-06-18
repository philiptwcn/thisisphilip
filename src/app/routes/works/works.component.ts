import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Entry } from "contentful";
import { ContentfulService } from "../../core/services/contentful.service";
import { WorkDialogComponent } from "./work-dialog.component";

export interface DialogData {
  // case: Entry<any>;
  id: string;
}

@Component({
  selector: "app-works",
  templateUrl: "./works.component.html",
  styleUrls: ["./works.component.sass"],
})
export class WorksComponent implements OnInit {
  cases: Entry<any>[] = [];
  // id:string;
  caseCategories = [
    { label: "Web & UI", category: "web & ui" },
    { label: "Graphics", category: "graphic" },
    { label: "Products", category: "product" },
    { label: "Photography", category: "photography" },
  ];

  constructor(
    private contentfulService: ContentfulService,
    public dialog: MatDialog
  ) {}
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(WorkDialogComponent, {
      width: "80vw",
      data: { id },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
    });
  }
  displayCase(id: string) {
    this.contentfulService.getCaseById(id).then((result) => {
      console.log("result", result);
    });
  }

  ngOnInit(): void {
    this.contentfulService.getCases().then((result) => {
      this.cases = result;
    });
    this.caseCategories.forEach((cat) =>
      this.contentfulService
        .getCasesByCategoryName(cat.category)
        .then((result) => {})
    );
  }
}
