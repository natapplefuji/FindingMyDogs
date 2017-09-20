import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptDetailPage } from './adopt-detail';

@NgModule({
  declarations: [
    AdoptDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptDetailPage),
  ],
})
export class AdoptDetailPageModule {}
