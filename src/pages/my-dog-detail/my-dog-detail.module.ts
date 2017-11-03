import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDogDetailPage } from './my-dog-detail';

@NgModule({
  declarations: [
    MyDogDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDogDetailPage),
  ],
})
export class MyDogDetailPageModule {}
