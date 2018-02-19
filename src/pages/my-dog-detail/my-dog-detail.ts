import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions,GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
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
    age: '',
    detail: '-',
    photo: '',
    status: '',
    lat: '',
    lng: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps: GoogleMaps,public platform: Platform) {
    this.dogDetail.dogName = navParams.get("dogName");
    this.dogDetail.breed = navParams.get("breed");
    this.dogDetail.gender = navParams.get("gender");
    this.dogDetail.age = navParams.get("age");
    this.dogDetail.detail = navParams.get("detail");
    this.dogDetail.photo = navParams.get("photo");
    this.dogDetail.status = navParams.get("status");
    this.dogDetail.lat = navParams.get("lat");
    this.dogDetail.lng = navParams.get("lng");
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
          lat: this.dogDetail.lat,
          lng: this.dogDetail.lng
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


  

}
