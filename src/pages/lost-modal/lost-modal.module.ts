import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostModalPage } from './lost-modal';

@NgModule({
  declarations: [
    LostModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LostModalPage),
  ],
})
export class LostModalPageModule {}
