import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostRelatedPage } from './lost-related';

@NgModule({
  declarations: [
    LostRelatedPage,
  ],
  imports: [
    IonicPageModule.forChild(LostRelatedPage),
  ],
})
export class LostRelatedPageModule {}
