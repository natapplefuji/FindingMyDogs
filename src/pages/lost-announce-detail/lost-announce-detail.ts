import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database-deprecated'
/**
 * Generated class for the LostAnnounceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lost-announce-detail',
  templateUrl: 'lost-announce-detail.html',
})
export class LostAnnounceDetailPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase) {
    this.announceDetail.dogName = navParams.get("dogName");
    this.announceDetail.breed = navParams.get("breed");
    this.announceDetail.gender = navParams.get("gender");
    this.announceDetail.age = navParams.get("age");
    this.announceDetail.dogDetail = navParams.get("dogDetail");
    this.announceDetail.photo = navParams.get("photo");
    this.announceDetail.contactMiss = navParams.get("contactMiss");
    this.announceDetail.uid = navParams.get("uid");
    //this.announceDetail.announcer = firebase.database.ref('albums');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostAnnounceDetailPage');
  }

}
