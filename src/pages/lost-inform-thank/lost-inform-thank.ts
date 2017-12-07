import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostMainPage} from '../lost-main/lost-main';
/**
 * Generated class for the LostInformThankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-inform-thank',
  templateUrl: 'lost-inform-thank.html',
})
export class LostInformThankPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostInformThankPage');
  }
  goToLost() { 
    this.navCtrl.push(LostMainPage)
  }

}
