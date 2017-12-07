import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotiPage } from './my-noti';

@NgModule({
  declarations: [
    MyNotiPage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotiPage),
  ],
})
export class MyNotiPageModule {}
