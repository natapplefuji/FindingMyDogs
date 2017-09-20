import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostRelatedDetailPage } from './lost-related-detail';

@NgModule({
  declarations: [
    LostRelatedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LostRelatedDetailPage),
  ],
})
export class LostRelatedDetailPageModule {}
