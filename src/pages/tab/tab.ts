import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LostMainPage } from '../lost-main/lost-main'
import { AdoptMainPage } from '../adopt-main/adopt-main';
import { TipPage } from '../tip/tip';
/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1 = HomePage;
  tab2 = LostMainPage;
  tab3 = AdoptMainPage;
  tab4 = TipPage;
  index = 0
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (navParams) { 
      this.index = this.navParams.get('index')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

}
