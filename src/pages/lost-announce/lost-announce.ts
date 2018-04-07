import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { LocationProvider } from '../../providers/location/location'
/**
 * Generated class for the LostAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-announce',
  templateUrl: 'lost-announce.html',
})
export class LostAnnouncePage {
  location: string;
  announcelistAll: FirebaseListObservable<any>;
  announcelistNear: FirebaseListObservable<any>;
  loc = { lat: 0, lng: 0 };
  district
  province
  country
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public platform: Platform, public _loc: LocationProvider) {
    this.location = "nearby";
    this.platform.ready().then(() => {
      _loc.getLocation().then(data => {
        this.loc.lat = data.coords.latitude;
        this.loc.lng = data.coords.longitude;
        this.getGeoRequest()
      })
    })
    this.announcelistAll = this.db.list('announceMissing/').map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostAnnouncePage');
  }
  getAnnouceAll() {
    console.log("baba")
    console.log(this.announcelistAll)
  }
  goToAnnouceDetail(dogName, breed, gender, age_year,age_month,age_week, dogDetail, photo, contactMiss, reward, uid, key) {
    console.log(key)
    this.navCtrl.push(LostAnnounceDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week:age_week,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid,
      key:key
    })
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
          this.announcelistNear = this.db.list('announceMissing/', {
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
