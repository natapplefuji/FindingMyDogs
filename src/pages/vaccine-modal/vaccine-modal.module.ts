import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VaccineModalPage } from './vaccine-modal';

@NgModule({
  declarations: [
    VaccineModalPage,
  ],
  imports: [
    IonicPageModule.forChild(VaccineModalPage),
  ],
})
export class VaccineModalPageModule {}
