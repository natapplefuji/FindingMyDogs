import { Component, ViewChild } from '@angular/core';
import { Platform,NavController, NavParams } from 'ionic-angular';
import { PredictProvider } from '../../providers/predict/predict';
import { LoadingController } from 'ionic-angular';
import { LostRelatedPage } from '../lost-related/lost-related';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
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
  dogs: [{
    dogName: string,
    score: string
  }];
  @ViewChild('map') element;
  constructor(public googleMaps: GoogleMaps, public plt: Platform,public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider, public loading: LoadingController) {

  }
  ngAfterViewInit() {   
        this.plt.ready().then(() => {   
          this.initMap();  
        });  
  }
  initMap() {   
        let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);    
        map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {   
          let coordinates: LatLng = new LatLng(33.6396965, -84.4304574); 
          let position = {   
            target: coordinates,    
            zoom: 17    
          };      
          map.animateCamera(position); 
          let markerOptions: MarkerOptions = {   
            position: coordinates,   
            icon: "assets/images/icons8-Marker-64.png",   
            title: 'Our first POI'   
          }; 
          const marker = map.addMarker(markerOptions)   
            .then((marker: Marker) => {  
              marker.showInfoWindow();   
          });   
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
  gotoPageRelate() {
    this.navCtrl.push(LostRelatedPage)
  }



}
