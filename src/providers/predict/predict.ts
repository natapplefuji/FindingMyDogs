import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
/*
  Generated class for the PredictProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PredictProvider {
  json;
  constructor(public http: Http) {
    console.log('Hello PredictProvider Provider');
  }
  
  public getJsonData():Observable<any>{
    console.log("baba")
    return this.http.get('https://dog-tensor3.herokuapp.com/predict2/beagle.jpg')
      .map((res:Response) => res.json())
      .catch(error => { return Observable.throw(error) })
  }
    
}
