import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { PredictProvider } from '../../providers/predict/predict';
import { LoadingController } from 'ionic-angular';
import { LostRelatedPage } from '../lost-related/lost-related';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition, GeocoderResult, Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LocationProvider } from '../../providers/location/location'
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  province
  country
  announcelistRelate: FirebaseListObservable<any>;
  constructor(
    private browser: InAppBrowser,
    public _loc: LocationProvider,
    private db: AngularFireDatabase,
    public googleMaps: GoogleMaps,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _predict: PredictProvider,
    public loading: LoadingController,
    public platform: Platform) {




    // initMap() {
    //   this._loc.getLocation().then(data => {
    //     this.loc.lat = data.coords.latitude;
    //     this.loc.lng = data.coords.longitude;
    //     this.getGeoRequest()
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

    //       let markerOptions: MarkerOptions = {
    //         position: this.loc,
    //         icon: "assets/images/icons8-Marker-64.png",
    //         title: 'Our first POI'
    //       };

    //       const marker = map.addMarker(markerOptions)
    //         .then((marker: Marker) => {
    //           marker.showInfoWindow();
    //         });
    //     })
    //   }).catch(err => {
    //     console.log(err);
    //   })

    // }

    // gotoPageRelate() {
    //   this.navCtrl.push(LostRelatedPage)
    // }
    // getGeoRequest() { 
    //   let req = {
    //     position: {
    //       lat: this.loc.lat,
    //       lng: this.loc.lng
    //     }
    //   }
    //   Geocoder.geocode(req).then(
    //     (res) => {
    //       alert(JSON.stringify(res))
    //       this.province = res[0]['locality']
    //       this.country = res[0]['country']
    //     });
  }
  openBrowser(url){
    this.browser.create(url);
  }




}
