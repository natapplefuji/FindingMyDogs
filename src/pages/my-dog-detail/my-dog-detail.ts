import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import firebase from 'firebase'
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
  @ViewChild('map') element: ElementRef;
  dogDetail = {
    dogName: '',
    breed: '',
    gender: '',
    age_year: '',
    age_month: '',
    age_week: '',
    detail: '-',
    photo: '',
    status: '',
    lat: '',
    lng: ''
  }
  key;
  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps, public platform: Platform) {
    this.key = navParams.get("key");
    console.log('key ' + this.key);
    firebase.database().ref("dogs/" + this.key).once("value", (snapshot) => {
      this.dogDetail.dogName = snapshot.val().dogName;
      this.dogDetail.breed = snapshot.val().breed;
      this.dogDetail.gender = snapshot.val().gender;
      this.dogDetail.age_year = snapshot.val().age_year;
      this.dogDetail.age_month = snapshot.val().age_month;
      this.dogDetail.age_week = snapshot.val().age_week;
      this.dogDetail.detail = snapshot.val().detail;
      this.dogDetail.photo = snapshot.val().photo;
      this.dogDetail.status = snapshot.val().status;
    })
    // this.dogDetail.dogName = navParams.get("dogName");
    // this.dogDetail.breed = navParams.get("breed");
    // this.dogDetail.gender = navParams.get("gender");
    // this.dogDetail.age_year = navParams.get("age_year");
    // this.dogDetail.age_month = navParams.get("age_month");
    // this.dogDetail.age_week = navParams.get("age_week");
    // this.dogDetail.detail = navParams.get("detail");
    // this.dogDetail.photo = navParams.get("photo");
    // this.dogDetail.status = navParams.get("status");
    // this.dogDetail.lat = navParams.get("lat");
    // this.dogDetail.lng = navParams.get("lng");
    console.log('dog...' + this.dogDetail.photo + '  ' + this.dogDetail.age_year + this.dogDetail.age_month + this.dogDetail.age_week)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogDetailPage');
  }

}
