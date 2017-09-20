import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LostAnnouncePage } from './lost-announce';

@NgModule({
  declarations: [
    LostAnnouncePage,
  ],
  imports: [
    IonicPageModule.forChild(LostAnnouncePage),
  ],
})
export class LostAnnouncePageModule {}
