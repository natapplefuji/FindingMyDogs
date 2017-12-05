import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LostAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-announce',
  templateUrl: 'lost-announce.html',
})
export class LostAnnouncePage {
  location: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.location = "nearby";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostAnnouncePage');
  }

}
