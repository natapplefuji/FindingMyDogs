import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { LocationProvider } from '../../providers/location/location';
import { AdoptDetailPage } from '../adopt-detail/adopt-detail';
/**
 * Generated class for the AdoptGetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-get',
  templateUrl: 'adopt-get.html',
})
export class AdoptGetPage {
  location: string
  announcelistAll: FirebaseListObservable<any>;
  announcelistNear: FirebaseListObservable<any>;
  loc = { lat: 0, lng: 0 };
  district
  province
  country
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public platform: Platform, public _loc: LocationProvider) {
    this.location = "nearby";
    //this.announcelistAll = this.db.list('announceAdopt/');
    this.platform.ready().then(() => {
      _loc.getLocation().then(data => {
        this.loc.lat = data.coords.latitude;
        this.loc.lng = data.coords.longitude;
        this.getGeoRequest()
      })
    })
    this.announcelistAll = this.db.list('announceAdopt/', {
      query: {
        orderByChild: 'status',
        equalTo: 'wait' //เอาเฉพาะประกาศที่มี status ยัง wait อยู่
      }
    }).map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptGetPage');
  }
  goToAnnouceDetail(dogName, breed, gender, age_year,age_month,age_week, dogDetail, photo, contactMiss, reward, uid, adoptKey) {
    this.navCtrl.push(AdoptDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week: age_week,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid,
      adoptKey: adoptKey
    })
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'เลือกประเภทที่ต้องการค้นหา',
      inputs: [
        {
          label: 'ทั้งหมด',
          value: 'all',
          type: 'radio',
          checked: true
        },
        {
          label: 'ขนาดตัว',
          value: 'size',
          type: 'radio'
        },
        {
          label: 'พื้นที่ในการเลี้ยง',
          value: 'areaRequire',
          type: 'radio'
        },
        {
          label: 'ความทนร้อน',
          value: 'hotResist',
          type: 'radio'
        },
        {
          label: 'ความทนหนาว',
          value: 'coldResist',
          type: 'radio'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }

      ]
    });
    alert.present();
  }
  getGeoRequest() {
    let req = {
      position: {
        lat: this.loc.lat,
        lng: this.loc.lng
      }
    }
    Geocoder.geocode(req).then(
      (res) => {
        this.district = res[0]['subLocality']
        //alert(this.district)
        if (this.district != undefined) {
          this.announcelistNear = this.db.list('announceAdopt/', {
            query: {
              orderByChild: 'district',
              equalTo: this.district
            }
          }).map((arr) => {
            var array = <any>{};
            array = arr;
            return array.reverse();
          }) as FirebaseListObservable<any[]>;

        }
        this.province = res[0]['locality']
        this.country = res[0]['country']
      });
  }
}
