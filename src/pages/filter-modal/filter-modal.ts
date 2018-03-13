import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  filterList = {}
  isenabled: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    this.filterList = {
      size: "0",
      areaRequire: "0",
      kidFriendly: "0",
      hairLength: "0",
      heatResist: "0",
      coldResist: "0",
      exercise: "0",
    }
  }
  enableButton() {
    this.isenabled = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }
  closeModalWithFilter() {
    this.view.dismiss(this.filterList);
  }
  closeModal() {
    this.view.dismiss();
  }

}
