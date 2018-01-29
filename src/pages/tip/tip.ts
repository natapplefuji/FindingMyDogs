import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PredictProvider } from '../../providers/predict/predict';
import {LoadingController} from 'ionic-angular';
/**
 * Generated class for the TipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tip',
  templateUrl: 'tip.html',
})
export class TipPage {
  dogs : [{
    dogName:string,
    score:string
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider, public loading: LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipPage');  
    // this.dog = this._predict.getJsonData();
    // console.log(this.dog)
  }
  getPredict() { 
    this._predict.getJsonData().subscribe((data) => { 
      this.dogs = data
      console.log(this.dogs)
    })
  }



}
