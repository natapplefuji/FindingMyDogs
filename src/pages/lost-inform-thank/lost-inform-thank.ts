import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { PredictProvider } from '../../providers/predict/predict';
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
  dogs : [{
    dogName:string,
    score:string
  }];
  photoDog
  constructor(public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider) {
    if (navParams) { 
      this.photoDog = this.navParams.get('photo')
      this._predict.getJsonData(this.photoDog).subscribe((data) => {
        this.dogs = data
        console.log(this.dogs)
      })
      console.log(this.photoDog)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostInformThankPage');
  }
  goToLost() { 
    this.navCtrl.push(LostMainPage)
  }
  getPredict() {
    
  }
}
