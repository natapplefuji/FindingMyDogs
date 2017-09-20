import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAnnouncePage } from './my-announce';

@NgModule({
  declarations: [
    MyAnnouncePage,
  ],
  imports: [
    IonicPageModule.forChild(MyAnnouncePage),
  ],
})
export class MyAnnouncePageModule {}
