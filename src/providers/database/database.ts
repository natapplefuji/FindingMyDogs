import { Injectable, } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  imageName: string = 'defaultName';
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello DatabaseProvider Provider');
  }

  uploadImageDog(imageString): Promise<any> {
    this.imageName = 'dog-' + new Date().getTime() + '.jpg';
      let storageRef: any;
      let parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('dogs/' + this.imageName);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }
  uploadImageProfile(imageString): Promise<any> {
    let image: string = 'profile-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('profiles/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }

}
