import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostInformPage } from '../lost-inform/lost-inform';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
import { InformFoundPage } from '../inform-found/inform-found';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail';
@IonicPage()
@Component({
  selector: 'page-lost-main',
  templateUrl: 'lost-main.html',
})
export class LostMainPage {
  announcelist: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.announcelist = this.db.list('announceMissing/', {
      query: {
        limitToLast:6
      }
    }
    ).map((arr) => { return arr.reverse(); }) as FirebaseListObservable<any[]>;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostMainPage');
  }
  lostInformTapped() { 
    this.navCtrl.push(LostInformPage);
  }
  lostAnnounce() { 
    this.navCtrl.push(LostAnnouncePage);
  }
  foundInformTapped() { 
    this.navCtrl.push(InformFoundPage);
  }
  goToAnnouceDetail(dogName,breed,gender,age,dogDetail,photo,contactMiss,reward,uid) {
    this.navCtrl.push(LostAnnounceDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo:photo,
      contactMiss: contactMiss,
      reward: reward,
      uid:uid
    })
  }
}
