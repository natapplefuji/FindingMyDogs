import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdoptGetPage } from '../adopt-get/adopt-get';
/**
 * Generated class for the AdoptMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adopt-main',
  templateUrl: 'adopt-main.html',
})
export class AdoptMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptMainPage');
  }
  adoptMore() { 
    this.navCtrl.push(AdoptGetPage);
  }
}
