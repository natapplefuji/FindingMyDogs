import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostMainPage } from './lost-main';

@NgModule({
  declarations: [
    LostMainPage,
  ],
  imports: [
    IonicPageModule.forChild(LostMainPage),
  ],
})
export class LostMainPageModule {}
