import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LostInformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-inform',
  templateUrl: 'lost-inform.html',
})
export class LostInformPage {
  infoLost = {
    dogName: '',
    dogAge: '',
    breed:'',
    contactMiss: '',
    dogDetail: '',
    dogImage: '',
    reward: '',
    status: 'lost'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  infoForm() { 
    console.dir(this.infoLost);
  }
  upload() { 
    console.log("Hello");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LostInformPage');
  }
  
}
