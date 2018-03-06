import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreedListPage } from './breed-list';

@NgModule({
  declarations: [
    BreedListPage,
  ],
  imports: [
    IonicPageModule.forChild(BreedListPage),
  ],
})
export class BreedListPageModule {}
