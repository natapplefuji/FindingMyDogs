import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail'
/**
 * Generated class for the LostRelatedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-related',
  templateUrl: 'lost-related.html',
})
export class LostRelatedPage {
  visible = false;
  announcelistRelate:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    let dogPredictBreed = "beagle"
    this.announcelistRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: dogPredictBreed
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostRelatedPage');
  }
  goToAnnouceDetail(dogName, breed, gender, age, dogDetail, photo, contactMiss, reward, uid) {
    this.navCtrl.push(LostAnnounceDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid
    })
  }
  toggle() {
    this.visible = true;
   }
}
