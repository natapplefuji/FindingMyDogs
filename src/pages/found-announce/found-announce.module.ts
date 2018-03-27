import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoundAnnouncePage } from './found-announce';

@NgModule({
  declarations: [
    FoundAnnouncePage,
  ],
  imports: [
    IonicPageModule.forChild(FoundAnnouncePage),
  ],
})
export class FoundAnnouncePageModule {}
