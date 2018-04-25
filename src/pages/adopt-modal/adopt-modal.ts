import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { BreedProvider } from '../../providers/breed/breed'

/**
 * Generated class for the AdoptModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-modal',
  templateUrl: 'adopt-modal.html',
})
export class AdoptModalPage {
  private infoAdopt: FormGroup;
  district = ''
  province =''
  country = ''
  date = new Date();
  day;
  month;
  year;
  milliTime;
  lat;
  lng;
  photo;
  photoName;
  uid;
  dogKey;
  breed;
  tel;
  constructor(private _breed: BreedProvider,private db: AngularFireDatabase,private userService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder, private view: ViewController) {
    this.breed = _breed.breeds;
    this.dogKey = navParams.get('dogKey');
    this.uid = userService.uid;
    this.photo = navParams.get('photo');
    this.photoName = navParams.get('photoName')
    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.db.database.ref('userProfile/' + this.uid).once('value', ((data) => {
      this.tel = data.val().tel;
    }))
    this.getGeoRequest();

    this.infoAdopt = this.formBuilder.group({
      dogName: [navParams.get('dogName'), Validators.required],
      breed: [navParams.get('breed'), Validators.required],
      gender: [navParams.get('gender'), Validators.required],
      contactMiss: ['', Validators.required],
      dogDetail: [navParams.get('detail'), Validators.required],
      reason: ['', Validators.required],
      age_year: [navParams.get('age_year')],
      age_month: [navParams.get('age_month')],
      age_week: [navParams.get('age_week')],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptModalPage');
  }
  closeModal() {
    this.view.dismiss();
  }
  addAnnounceAdopt() {
    this.db.database.ref('/announceAdopt').push().set({
      uid: this.uid,
      dogName: this.infoAdopt.value.dogName,
      breed: this.infoAdopt.value.breed,
      gender: this.infoAdopt.value.gender,
      contactMiss: this.infoAdopt.value.contactMiss,
      dogDetail: this.infoAdopt.value.dogDetail,
      photo: this.photo,
      photoName: this.photoName,
      day: this.day,
      month: this.month,
      year: this.year,
      millisec: this.milliTime,
      lat: this.lat,
      lng: this.lng,
      district: this.district,
      province: this.province,
      country: this.country,
      age_year: this.infoAdopt.value.age_year,
      age_month: this.infoAdopt.value.age_month,
      age_week: this.infoAdopt.value.age_week,
      status: 'รอรับอุปการะ'
    }).then(() => {
      this.db.database.ref('dogs/'+this.dogKey).update({status:'wait'})
      this.view.dismiss();
    })
  }
  getGeoRequest() { 
    let req = {
      position: {
        lat: this.lat,
        lng: this.lng
      }
    }
    Geocoder.geocode(req).then(
      (res) => {
        this.district = res[0]['subLocality']
        this.province = res[0]['locality']
        this.country = res[0]['country']
      });
  }
}
