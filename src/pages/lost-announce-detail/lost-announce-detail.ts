import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import {InformFoundManualPage} from '../inform-found-manual/inform-found-manual';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase,private userService: UserServiceProvider,public modalCtrl: ModalController,private callNumber: CallNumber) {
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
    this.announceDetail.key = navParams.get("key");
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
    console.log('ionViewDidLoad LostAnnounceDetailPage');
    console.log(this.announceDetail.age_year)
    console.log(this.announceDetail.age_month)
    console.log(this.announceDetail.age_week)
  }
  notiAnnounceLost() { 
    let uidFounder= this.userService.uid;
    let obj = {
      announceMissingKey: this.navParams.get("key"),
      announceMissingBreed : this.navParams.get("breed"), 
      uid: uidFounder
    };
    
    console.log(obj.announceMissingKey)
    let myModal = this.modalCtrl.create(InformFoundManualPage,obj);
    myModal.present();
    // let notiRef = this.db.database.ref('/notification')
    // let uid = this.userService.uid;
    // notiRef.push().set({
    //   announceFoundKey: "same",
    //   announceMissingKey: missingKey,
    //   uid: uid,
    //   status: 'lostM'
    // })
  }
  launchDialer(n:string){
    this.callNumber.callNumber(n, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
}
}
