import { NgModule } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatTabsModule, MatDialogModule],
})
export class MaterialModule {}
