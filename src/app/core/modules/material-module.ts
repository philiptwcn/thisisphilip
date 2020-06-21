import { NgModule } from "@angular/core";

// angular material
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
