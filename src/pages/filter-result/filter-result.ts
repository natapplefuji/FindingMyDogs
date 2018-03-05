import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-result',
  templateUrl: 'filter-result.html',
})
export class FilterResultPage {
  breedResult;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.breedResult = navParams.get('result');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterResultPage');
  }

}
