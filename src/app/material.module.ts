import { NgModule } from '@angular/core';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule {}