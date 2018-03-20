import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ModalController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions,GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { ModalPage } from '../modal/modal';
/**
 * Generated class for the MyNotiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-noti-detail',
  templateUrl: 'my-noti-detail.html',
})
export class MyNotiDetailPage {
  @ViewChild('map') element: ElementRef;
  notiDetail = {
      breed: '',
      contactMiss: '',
      day: '',
      dogDetail: '',
      dogWithYou: '',
      founder: '',
      lat: '',
      lng: '',
      month: '',
      photo: '',
      year:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,public googleMaps: GoogleMaps,public platform: Platform,public modalCtrl : ModalController) {
    let key = navParams.get("announceFoundKey");
    console.log(key)
    this.db.object('announceFound/' + key).subscribe(data => {
      this.notiDetail.breed = data.breed
      this.notiDetail.contactMiss = data.contactMiss
      this.notiDetail.day = data.day
      this.notiDetail.dogDetail = data.dogDetail
      this.notiDetail.dogWithYou = data.dogWithYou
      this.notiDetail.founder = data.founder
      this.notiDetail.lat = data.lat
      this.notiDetail.lng = data.lng
      this.notiDetail.month = data.month
      this.notiDetail.photo = data.photo
      this.notiDetail.year = data.year
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogDetailPage');
    this.platform.ready().then(() => {
      this.initMap();
    });
  }
  initMap() {

    var mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.notiDetail.lat,
          lng: this.notiDetail.lng
        },
        zoom: 16,
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
  }
  goToModalNoti() { 
    var data = { message : 'hello world' };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
  }

}
