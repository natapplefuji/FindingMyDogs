import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptModalPage } from './adopt-modal';

@NgModule({
  declarations: [
    AdoptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptModalPage),
  ],
})
export class AdoptModalPageModule {}
