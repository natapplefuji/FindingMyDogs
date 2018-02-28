import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PredictProvider } from '../../providers/predict/predict';
import { LoadingController } from 'ionic-angular';
import { LostRelatedPage } from '../lost-related/lost-related';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LocationProvider } from '../../providers/location/location'

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
  @ViewChild('map') element: ElementRef;

  dogs: [{
    dogName: string,
    score: string
  }];
  coordinates;
  uidList = []
  loc = { lat: 0, lng: 0 };
  announcelistRelate: FirebaseListObservable<any>;
  constructor(public _loc: LocationProvider, private db: AngularFireDatabase, public googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider, public loading: LoadingController, public platform: Platform) {
    // this.getLocation().then(res => {
    //   console.log("lat is " + res.coords.latitude);
    //   console.log("long is " + res.coords.longitude);
    //   this.coordinates = new LatLng(res.coords.latitude, res.coords.longitude);

    // }).catch(err => {
    //   console.log(err);
    // // })
    // this._loc.getLocation();
    // console.log("lat : "+this.loc.lat+" long : "+this.loc.lng)


    this.announcelistRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: 'beagle'
      }, preserveSnapshot: true
    })
  }
  getList() {
    /*this.announcelistRelate.subscribe(itemkeys => {
      itemkeys.forEach(itemkey => {
        let uid;
        console.log(itemkey.key);
        this.db.object('announceMissing/' + itemkey.key).subscribe(user => {
          uid = user.uid;
          this.uidList.push(uid);

          console.log(uid);
        });
    
        
      });
    })*/
    var array = []
    var notificationObj = {
      contents: { en: "message body" },
      include_player_ids: [array]
    };
    
    window["plugins"].OneSignal.postNotification(notificationObj,
      function (successResponse) {
        alert("Notification Post Success:"+ successResponse);
      },
      function (failedResponse) {
        alert("Notification Post Failed: "+ failedResponse);
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TipPage');
  //   // this.dog = this._predict.getJsonData();
  //   // console.log(this.dog)
  //   this.platform.ready().then(() => {
  //     this.initMap();
  //   });
  // }
  // getPredict() { 
  //   this._predict.getJsonData().subscribe((data) => { 
  //     this.dogs = data
  //     console.log(this.dogs)
  //   })
  // }


  initMap() {
    this._loc.getLocation().then(data => {
      this.loc.lat = data.coords.latitude;
      this.loc.lng = data.coords.longitude;
      console.log("p lat : " + this.loc.lat + " p long : " + this.loc.lng);
      var mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: this.loc.lat,
            lng: this.loc.lng
          },
          zoom: 18,
          tilt: 30
        }
      };
      let map: GoogleMap = this.googleMaps.create(this.element.nativeElement, mapOptions);

      map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

        // let markerOptions: MarkerOptions = {
        //   position: this.loc,
        //   icon: "assets/images/icons8-Marker-64.png",
        //   title: 'Our first POI'
        // };

        // const marker = map.addMarker(markerOptions)
        //   .then((marker: Marker) => {
        //     marker.showInfoWindow();
        //   });
      })
    }).catch(err => {
      console.log(err);
    })


  }

  gotoPageRelate() {
    this.navCtrl.push(LostRelatedPage)
  }



}
