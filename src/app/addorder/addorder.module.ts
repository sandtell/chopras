import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddorderPageRoutingModule } from './addorder-routing.module';
import { AddorderPage } from './addorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddorderPageRoutingModule
  ],
  declarations: [AddorderPage]
})
export class AddorderPageModule {}
