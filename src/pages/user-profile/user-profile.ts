import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated'
import { Observable } from 'rxjs/Observable'; import 'rxjs/add/operator/map';
import firebase from 'firebase';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userid:any
  user: Object = {} 
  userInfo = {
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    photo: '',
    tel: ''

  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.userid = firebase.auth().currentUser.uid;
    this.user = this.db.object('/userProfile/' + this.userid,{ preserveSnapshot: true})
    .subscribe(snapshot=>{
          this.userInfo.displayName = snapshot.child("displayName").val(),
          this.userInfo.email = snapshot.child("email").val(),
          this.userInfo.firstName = snapshot.child("firstName").val(),
          this.userInfo.lastName = snapshot.child("lastName").val(),
          this.userInfo.photo = snapshot.child("photo").val(),
          this.userInfo.tel = snapshot.child("tel").val()
      });
  }

  ionViewDidLoad() {
    this.showData();
   console.log("UserProfile")
  }
  showData() {
    console.dir(this.userInfo)
  }
}
