import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation'

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {

  constructor(public http: Http, public _geo: Geolocation) {
    console.log('Hello LocationProvider Provider');
  }
  getLocation() {
    return this._geo.getCurrentPosition();
  }

}
