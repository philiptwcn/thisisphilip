import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Entry } from "contentful";
import { ContentfulService } from "../../core/services/contentful.service";
import { DialogData } from "./works.component";

@Component({
  template: `
    <ng-container *ngIf="case">
      <h1 mat-dialog-title>{{ case.fields.title }}</h1>
      <div mat-dialog-content class="container">
        <p class="content is-size-6 is-size-7-touch is-family-sans-serif">
          {{ case.fields.description }}
        </p>
        <div
          class="container-fluid columns is-multiline is-vcentered is-mobile"
        >
          <img
            *ngFor="let image of case.fields.images"
            src="{{ image.fields.file.url }}"
            alt="case image"
            class="image column is-6-desktop is-12-mobile"
          />
        </div>
      </div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </div>
    </ng-container>
  `,
})
export class WorkDialogComponent implements OnInit {
  case: Entry<any>;

  constructor(
    private contentfulService: ContentfulService,
    public dialogRef: MatDialogRef<WorkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.contentfulService
      .getCaseById(this.data.id)
      .then(result => {
        this.case = result;
      })
      .catch(err => {
        console.log("err", err);
      });
  }
}
