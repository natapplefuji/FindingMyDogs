import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { AdoptGetPage } from '../adopt-get/adopt-get';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  lostTapped() { 
    this.navCtrl.push(LostMainPage);
  }
  adoptTapped() { 
    this.navCtrl.push(AdoptGetPage);
  }
}
