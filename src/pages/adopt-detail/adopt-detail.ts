import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database-deprecated'
/**
 * Generated class for the AdoptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-detail',
  templateUrl: 'adopt-detail.html',
})
export class AdoptDetailPage {
  announceDetail = {
    dogName: '',
    breed: '',
    gender: '',
    age: '',
    dogDetail: '',
    photo:'',
    contactMiss: '',
    reward: '',
    uid:'',
    announcer:''
  }
  user: Object = {} 
  userDetail = {
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    photo: '',
    tel: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.announceDetail.dogName = navParams.get("dogName");
    this.announceDetail.breed = navParams.get("breed");
    this.announceDetail.gender = navParams.get("gender");
    this.announceDetail.age = navParams.get("age");
    this.announceDetail.dogDetail = navParams.get("dogDetail");
    this.announceDetail.photo = navParams.get("photo");
    this.announceDetail.contactMiss = navParams.get("contactMiss");
    this.announceDetail.uid = navParams.get("uid");
    this.user = this.db.object('/userProfile/' + navParams.get("uid"),{ preserveSnapshot: true})
    .subscribe(snapshot=>{
          this.userDetail.displayName = snapshot.child("displayName").val(),
          this.userDetail.email = snapshot.child("email").val(),
          this.userDetail.firstName = snapshot.child("firstName").val(),
          this.userDetail.lastName = snapshot.child("lastName").val(),
          this.userDetail.photo = snapshot.child("photo").val(),
          this.userDetail.tel = snapshot.child("tel").val()
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptDetailPage');
  }

}
