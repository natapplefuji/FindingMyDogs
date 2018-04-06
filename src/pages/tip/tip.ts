import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform,AlertController } from 'ionic-angular';
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
  // @ViewChild('map') element: ElementRef;

  // dogs: [{
  //   dogName: string,
  //   score: string
  // }];
  // coordinates;
  // uidList = []
  // loc = { lat: 0, lng: 0 };
  breed = ['basenji', 'beagle'];
  announcelistRelate: FirebaseListObservable<any>;
  breedList: any[];
  test = {};
  playerID;
  constructor(private alertCtrl:AlertController,private plt: Platform,public _loc: LocationProvider, private db: AngularFireDatabase, public googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider, public loading: LoadingController, public platform: Platform) {
    

    // this.getLocation().then(res => {
    //   console.log("lat is " + res.coords.latitude);
    //   console.log("long is " + res.coords.longitude);
    //   this.coordinates = new LatLng(res.coords.latitude, res.coords.longitude);

    // }).catch(err => {
    //   console.log(err);
    // // })
    // this._loc.getLocation();
    // console.log("lat : "+this.loc.lat+" long : "+this.loc.lng)


    // this.announcelistRelate = this.db.list('announceMissing/', {
    //   query: {
    //     orderByChild: 'breed',
    //     equalTo: 'beagle'
    //   }, preserveSnapshot: true
    // })
    // this.getBreed()
  }
  testNoti() {
    window["plugins"].OneSignal.getIds((ids => {
      this.playerID = ids.userId;
      var notificationObj = {
        contents: {
          en: "Similar Dog was found! Please check..",
          th: "พบสุนัขลักษณะใกล้เคียง โปรดตรวจสอบ.."
        },
        include_player_ids: [this.playerID],
        //send_after : "March 13th 2018, 3:12:45 pm UTC+07:00"
      };
      window["plugins"].OneSignal.postNotification(notificationObj,
        (successResponse) => {
          alert("แจ้งแล้วนะ");
          
        },
        (failedResponse) => {
          //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
          alert(this.playerID)
          alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
    }));
    
    
    // this.localNotifications.schedule({
    //   id: 1,
    //   title: 'Attention',
    //   text: 'Simons Notification',
    //   data: { mydata: 'My hidden message this is' },
    //   //at: new Date(new Date().getTime() + 5000)
    // });
  }
  // getBreed() {
  //   for (let i = 0; i < this.breed.length; i++){
  //     this.db.list('announceMissing/', {
  //       query: {
  //         orderByChild: 'breed',
  //         equalTo: this.breed[i]
  //       }
  //     }).forEach(element => {
  //       console.log(element)
  //       this.test[i] = element;
  //     })
  //   }
    
    // this.announcelistRelate = this.db.list('announceMissing/', {
    //   query: {
    //     orderByChild: 'breed',
    //     equalTo: 'basenji' || 'beagle'
    //   }
    // })
  // }


  // getList() {
  //   /*this.announcelistRelate.subscribe(itemkeys => {
  //     itemkeys.forEach(itemkey => {
  //       let uid;
  //       console.log(itemkey.key);
  //       this.db.object('announceMissing/' + itemkey.key).subscribe(user => {
  //         uid = user.uid;
  //         this.uidList.push(uid);

  //         console.log(uid);
  //       });


  //     });
  //   })*/
  //   var array = []
  //   var notificationObj = {
  //     contents: { en: "message body" },
  //     include_player_ids: [array]
  //   };

  //   window["plugins"].OneSignal.postNotification(notificationObj,
  //     function (successResponse) {
  //       alert("Notification Post Success:"+ successResponse);
  //     },
  //     function (failedResponse) {
  //       alert("Notification Post Failed: "+ failedResponse);
  //       alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
  //     }
  //   );
  // }

  // // ionViewDidLoad() {
  // //   console.log('ionViewDidLoad TipPage');
  // //   // this.dog = this._predict.getJsonData();
  // //   // console.log(this.dog)
  // //   this.platform.ready().then(() => {
  // //     this.initMap();
  // //   });
  // // }
  // // getPredict() { 
  // //   this._predict.getJsonData().subscribe((data) => { 
  // //     this.dogs = data
  // //     console.log(this.dogs)
  // //   })
  // // }


  // initMap() {
  //   this._loc.getLocation().then(data => {
  //     this.loc.lat = data.coords.latitude;
  //     this.loc.lng = data.coords.longitude;
  //     console.log("p lat : " + this.loc.lat + " p long : " + this.loc.lng);
  //     var mapOptions: GoogleMapOptions = {
  //       camera: {
  //         target: {
  //           lat: this.loc.lat,
  //           lng: this.loc.lng
  //         },
  //         zoom: 18,
  //         tilt: 30
  //       }
  //     };
  //     let map: GoogleMap = this.googleMaps.create(this.element.nativeElement, mapOptions);

  //     map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

  //       // let markerOptions: MarkerOptions = {
  //       //   position: this.loc,
  //       //   icon: "assets/images/icons8-Marker-64.png",
  //       //   title: 'Our first POI'
  //       // };

  //       // const marker = map.addMarker(markerOptions)
  //       //   .then((marker: Marker) => {
  //       //     marker.showInfoWindow();
  //       //   });
  //     })
  //   }).catch(err => {
  //     console.log(err);
  //   })


  // }

  // gotoPageRelate() {
  //   this.navCtrl.push(LostRelatedPage)
  // }



}
