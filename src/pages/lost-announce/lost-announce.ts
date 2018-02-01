import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
<<<<<<< HEAD
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail'
=======
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { MyDogDetailPage } from '../my-dog-detail/my-dog-detail'
>>>>>>> fe2b5235f57fe6d7628437f2963983030e5b863a
/**
 * Generated class for the LostAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-announce',
  templateUrl: 'lost-announce.html',
})
export class LostAnnouncePage {
  location: string;
  announcelistAll:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.location = "nearby";
    this.announcelistAll = this.db.list('announceMissing/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostAnnouncePage');
  }
  getAnnouceAll() { 
    console.log("baba")
    this.announcelistAll = this.db.list('announceMissing/');
    console.log(this.announcelistAll)
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
