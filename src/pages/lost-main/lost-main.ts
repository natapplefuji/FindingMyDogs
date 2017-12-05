import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostInformPage } from '../lost-inform/lost-inform';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
@IonicPage()
@Component({
  selector: 'page-lost-main',
  templateUrl: 'lost-main.html',
})
export class LostMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostMainPage');
  }
  lostInformTapped() { 
    this.navCtrl.push(LostInformPage);
  }
  lostAnnounce() { 
    this.navCtrl.push(LostAnnouncePage);
  }
}
