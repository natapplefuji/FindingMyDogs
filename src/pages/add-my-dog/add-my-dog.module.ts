import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMyDogPage } from './add-my-dog';

@NgModule({
  declarations: [
    AddMyDogPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMyDogPage),
  ],
})
export class AddMyDogPageModule {}
