import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { GoogleMaps, GoogleMap, GoogleMapOptions,GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';


/**
 * Generated class for the FoundAnnounceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found-announce-detail',
  templateUrl: 'found-announce-detail.html',
  })
  
export class FoundAnnounceDetailPage {
  @ViewChild('map') element: ElementRef;
  founder
  breed
  contact
  dogDetail
  dogWithYou
  photo
  lat
  lng
  district = ''
  province = ''
  constructor(public navCtrl: NavController, public navParams: NavParams,public googleMaps: GoogleMaps, public platform: Platform) {
    this.founder = this.navParams.get('founder');
    this.breed = this.navParams.get('breed');
    this.contact = this.navParams.get('contact');
    this.dogDetail = this.navParams.get('dogDetail');
    if (this.navParams.get('dogWithYou') == 'yes') {
      this.dogWithYou = 'อยู่กับผู้พบ'
    }else { this.dogWithYou = 'ไม่ได้อยู่กับผู้พบแล้ว'}
    this.photo = this.navParams.get('photo');
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.getGeoRequest()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundAnnounceDetailPage');
    this.platform.ready().then(() => {
      this.initMap();
    });
  }
  initMap() {

    var mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 16,
      }
    };
    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement, mapOptions);
    
    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
  
      let markerOptions: MarkerOptions = {
        position: {
          lat: +this.lat,
          lng: +this.lng
        },
        icon: "assets/images/icons8-Marker-64.png",
        title: 'พบสุนัขบริเวณนี้'
      };
  
      const marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

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
      });
  }
}
