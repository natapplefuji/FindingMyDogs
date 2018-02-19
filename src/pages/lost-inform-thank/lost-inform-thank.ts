import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { PredictProvider } from '../../providers/predict/predict';
import { LoadingCmp } from 'ionic-angular/components/loading/loading-component';
import {LostRelatedPage} from '../lost-related/lost-related';
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
  dogs: [{
    dogName: string,
    score: string
  }];
  photoDog
  annouceFoundId
  constructor(public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider,public loadingCtrl:LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
    if (navParams) {
      this.photoDog = this.navParams.get('photo')
      this.annouceFoundId = this.navParams.get('announceFoundId');
      loading.present().then(() => {
        this._predict.getJsonData(this.photoDog).subscribe((data) => {
          this.dogs = data
          loading.dismiss();
          console.log(this.dogs)
        });

      })
      console.log(this.photoDog)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostInformThankPage');
  }
  goToLost() {
    this.navCtrl.push(LostRelatedPage,{ breed: this.dogs[0].dogName,annouceFoundId :this.annouceFoundId})
  }
}
