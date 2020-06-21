import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { Observable } from "rxjs";
import { ContentfulService } from "../../core/services/contentful.service";
import { DialogData } from "./works.component";

@Component({
  template: `
    <ng-container *ngIf="case$ | async as case">
      <h1 mat-dialog-title>{{ case.fields.title }}</h1>
      <div mat-dialog-content class="container">
        <p
          class="content is-size-6 is-size-7-touch is-family-sans-serif"
          [innerHTML]="case.fields.description | mdToHtml"
        ></p>
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
  `
})
export class WorkDialogComponent implements OnInit {
  case$: Observable<any>;

  constructor(
    private contentfulService: ContentfulService,
    public dialogRef: MatDialogRef<WorkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.case$ = this.contentfulService.getEntryById(this.data.id);
  }
}
