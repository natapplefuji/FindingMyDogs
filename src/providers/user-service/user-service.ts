import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase'
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database-deprecated'
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  userInfo: FirebaseObjectObservable<any[]>;
  uid: any;
  constructor(private db : AngularFireDatabase) {
    console.log('Hello UserServiceProvider Provider');
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        console.log(this.uid);
        this.userInfo = db.object('userProfile/'+this.uid);
        
      }
    });
  }

  retrieveUserInfo() { 
    //this.db.list('userProfile').subscribe(console.log);;//ย้ายไปใน constructor
    //console.log(this.userInfo);
    //return this.userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

}
