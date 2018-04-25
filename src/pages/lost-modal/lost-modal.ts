import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { BreedProvider } from '../../providers/breed/breed'
/**
 * Generated class for the LostModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-modal',
  templateUrl: 'lost-modal.html',
})
export class LostModalPage {
  private announcelost: FormGroup;
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
  constructor(private _breed: BreedProvider,private db: AngularFireDatabase,private userService: UserServiceProvider,private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
    
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
    this.announcelost = this.formBuilder.group({
      dogName: [navParams.get('dogName'), Validators.required],
      breed: [navParams.get('breed'), Validators.required],
      gender: [navParams.get('gender'), Validators.required],
      contactMiss: [''],
      dogDetail: [navParams.get('detail')],
      reward: [''],
      age_year: [navParams.get('age_year')],
      age_month: [navParams.get('age_month')],
      age_week: [navParams.get('age_week')],
      tel:[this.tel,Validators.required]
    })
  }    

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostModalPage');
  }
  addAnnounceLost() {
    this.db.database.ref('userProfile/' + this.uid).child('tel').update({ tel: this.announcelost.value.tel });
    var myRef = this.db.database.ref('/announceMissing').push()
          var key = myRef.key
          this.db.database.ref('/announceMissing/' + key).set({
            uid: this.uid,
            announcelostid: key,
            dogName: this.announcelost.value.dogName,
            breed: this.announcelost.value.breed,
            gender: this.announcelost.value.gender,
            contactMiss: this.announcelost.value.contactMiss,
            dogDetail: this.announcelost.value.dogDetail,
            reward: this.announcelost.value.reward,
            photo: this.photo,
            photoName: this.photoName,
            day: this.day,
            month: this.month,
            year: this.year,
            millisec: this.milliTime,
            lat: this.lat,
            lng: this.lng,
            district: this.district,
            province:this.province,
            country: this.country,
            age_year: this.announcelost.value.age_year,
            age_month: this.announcelost.value.age_month,
            age_week: this.announcelost.value.age_week,
            status:'สูญหาย'//lost เป็น default/update เป็น found เมื่อพบเจ้าของแล้ว
          }).then(() => {
            this.db.database.ref('dog/'+this.dogKey).update({status:'lost'})
            this.view.dismiss();
          })
  }
  closeModal() {
    this.view.dismiss();
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
