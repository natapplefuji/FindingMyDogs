import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  loc = { lat: 0, lng: 0 };
  constructor(public http: Http, public _geo: Geolocation, public platform: Platform) {
    console.log('Hello LocationProvider Provider');
    platform.ready().then(() => {
      console.log("Platform is ready in Location Provider");
      
      
    });
  }
  getLocation() {
    let options = { timeout: 5000 };
    return this._geo.getCurrentPosition(options)
  }

}
