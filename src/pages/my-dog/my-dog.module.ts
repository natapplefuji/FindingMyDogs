import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDogPage } from './my-dog';

@NgModule({
  declarations: [
    MyDogPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDogPage),
  ],
})
export class MyDogPageModule {}
