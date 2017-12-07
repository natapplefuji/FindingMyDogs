import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotiDetailPage } from './my-noti-detail';

@NgModule({
  declarations: [
    MyNotiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotiDetailPage),
  ],
})
export class MyNotiDetailPageModule {}
