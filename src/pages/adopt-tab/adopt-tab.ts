import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { AdoptGivePage } from '../adopt-give/adopt-give';
/**
 * Generated class for the AdoptTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-tab',
  templateUrl: 'adopt-tab.html',
})
export class AdoptTabPage {
  tabAdoptGet: any;
  tabAdoptGive: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tabAdoptGet = AdoptGetPage;
      this.tabAdoptGive = AdoptGivePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptTabPage');
  }

}
