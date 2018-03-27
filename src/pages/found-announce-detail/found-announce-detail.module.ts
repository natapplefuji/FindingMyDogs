import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoundAnnounceDetailPage } from './found-announce-detail';

@NgModule({
  declarations: [
    FoundAnnounceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FoundAnnounceDetailPage),
  ],
})
export class FoundAnnounceDetailPageModule {}
