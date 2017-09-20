import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptTabPage } from './adopt-tab';

@NgModule({
  declarations: [
    AdoptTabPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptTabPage),
  ],
})
export class AdoptTabPageModule {}
