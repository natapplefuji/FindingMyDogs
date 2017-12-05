import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdoptGetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-get',
  templateUrl: 'adopt-get.html',
})
export class AdoptGetPage {
  location:string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.location = "nearby";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptGetPage');
  }

}
