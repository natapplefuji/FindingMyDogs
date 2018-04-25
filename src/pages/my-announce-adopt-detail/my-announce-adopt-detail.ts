import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'

/**
 * Generated class for the MyAnnounceAdoptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-announce-adopt-detail',
  templateUrl: 'my-announce-adopt-detail.html',
})
export class MyAnnounceAdoptDetailPage {
  announceDetail = {
    dogName: '',
    breed: '',
    gender: '',
    age_year: '',
    age_month: '',
    age_week: '',
    dogDetail: '',
    photo:'',
    contactMiss: '',
    reward: '',
    uid:'',
    announcer: '',
    key:''
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
  constructor(private toastCtrl: ToastController,public userService:UserServiceProvider,public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.announceDetail.dogName = navParams.get("dogName");
    this.announceDetail.breed = navParams.get("breed");
    this.announceDetail.gender = navParams.get("gender");
    this.announceDetail.age_year = navParams.get("age_year");
    this.announceDetail.age_month = navParams.get("age_month");
    this.announceDetail.age_week = navParams.get("age_week");
    this.announceDetail.dogDetail = navParams.get("dogDetail");
    this.announceDetail.photo = navParams.get("photo");
    this.announceDetail.contactMiss = navParams.get("contactMiss");
    this.announceDetail.uid = navParams.get("uid");
    this.announceDetail.key = navParams.get("adoptKey");
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
    console.log('ionViewDidLoad MyAnnounceAdoptDetailPage');
  }

}
