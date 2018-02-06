import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { PredictProvider } from '../../providers/predict/predict';
import { LoadingController } from 'ionic-angular';
import { LostRelatedPage } from '../lost-related/lost-related';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation'

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
  constructor(private geoloc: Geolocation, public googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider, public loading: LoadingController, public platform: Platform) {
    this.getLocation().then(res => {
      console.log("lat is " + res.coords.latitude);
      console.log("long is " + res.coords.longitude);
      this.coordinates = new LatLng(res.coords.latitude, res.coords.longitude);
      
    }).catch(err => {
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipPage');
    // this.dog = this._predict.getJsonData();
    // console.log(this.dog)
  }
  // getPredict() { 
  //   this._predict.getJsonData().subscribe((data) => { 
  //     this.dogs = data
  //     console.log(this.dogs)
  //   })
  // }
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });
    
  }
  initMap() {

    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      
      let position = {
        target: this.coordinates,
        zoom: 17
      };

      map.animateCamera(position);
      
      let markerOptions: MarkerOptions = {
        position: this.coordinates,
        icon: "assets/images/icons8-Marker-64.png",
        title: 'Our first POI'
      };

      const marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });
    })
  }
  
  getLocation() {
    return this.geoloc.getCurrentPosition();
  }

  gotoPageRelate() {
    this.navCtrl.push(LostRelatedPage)
  }



}
