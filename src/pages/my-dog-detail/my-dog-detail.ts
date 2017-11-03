import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyDogDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-dog-detail',
  templateUrl: 'my-dog-detail.html',
})
export class MyDogDetailPage {
  dogDetail = {
    dogName: '',
    breed: '',
    gender: '',
    age: '',
    detail: '-',
    photo: '',
    status: '',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dogDetail.dogName = navParams.get("dogName");
    this.dogDetail.breed = navParams.get("breed");
    this.dogDetail.gender = navParams.get("gender");
    this.dogDetail.age = navParams.get("age");
    this.dogDetail.detail = navParams.get("detail");
    this.dogDetail.photo = navParams.get("photo");
    this.dogDetail.status = navParams.get("status");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogDetailPage');
  }

}
