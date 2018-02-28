import { Component } from '@angular/core';
import { HomePage } from '../home/home'
import { LostMainPage } from '../lost-main/lost-main'
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
  announcelistRelate: FirebaseListObservable<any>;
  announceBreedRelate: FirebaseListObservable<any>;
  playerIDList = []
  annouceFoundId
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    let dogPredictBreed = this.navParams.get('breed')
    this.annouceFoundId = this.navParams.get('annouceFoundId')
    this.announcelistRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: dogPredictBreed
      }
    })
    this.announceBreedRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: dogPredictBreed
      }, preserveSnapshot: true
    })
    this.getList();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostRelatedPage');
  }
  getList() {
    this.announceBreedRelate.subscribe(itemkeys => {
      itemkeys.forEach(itemkey => {
        var uid;
        var playerID : string;
        console.log(itemkey.key);
        this.db.object('announceMissing/' + itemkey.key).subscribe(user => {
          uid = user.uid;
          this.db.object('userProfile/' + uid).subscribe(user => {
            playerID = user.playerID;
            alert(playerID);
            this.playerIDList.push(playerID);
          })
          this.createNoti(itemkey.key, uid)        
        });
      });
    })
    
  }
  createNoti(missingKey, uid) {
    let notiRef = this.db.database.ref('/notification')
    notiRef.push().set({
      announceFoundKey: this.annouceFoundId,
      announceMissingKey: missingKey,
      uid: uid,
      status: 'lost'
    })
  }
  pushNoti() {
    var notificationObj = {
      contents: {
        en: "Similar Dog was found! Please check..",
        th: "พบสุนัขลักษณะใกล้เคียง โปรดตรวจสอบ.."
      },
      include_player_ids: this.playerIDList
    };

    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        alert("Notification Post Success:" + JSON.stringify(this.playerIDList));
      },
      (failedResponse) => {
        alert("Notification Post Failed playerID ->: " +JSON.stringify(this.playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
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
  goToHome() {
    this.pushNoti();
    this.navCtrl.popToRoot();
  }
  toggle() {
    this.visible = true;
  }
}
