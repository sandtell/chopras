import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketPageRoutingModule } from './ticket-routing.module';
import { TicketPage } from './ticket.page';
import { AddorderPage } from '../addorder/addorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TicketPageRoutingModule
  ],
  declarations: [
    TicketPage,
    AddorderPage
  ],
  entryComponents: [AddorderPage]
})
export class TicketPageModule {}
