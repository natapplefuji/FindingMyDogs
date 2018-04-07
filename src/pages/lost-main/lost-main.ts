import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LostInformPage } from '../lost-inform/lost-inform';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
import { InformFoundPage } from '../inform-found/inform-found';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail';
import { FoundAnnouncePage } from '../found-announce/found-announce';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { MyDogPage } from '../my-dog/my-dog';
import firebase from 'firebase/app'
@IonicPage()
@Component({
  selector: 'page-lost-main',
  templateUrl: 'lost-main.html',
})
export class LostMainPage {
  announcelist: FirebaseListObservable<any>;
  uid
  constructor(private alertCtrl: AlertController,private userService :UserServiceProvider, public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.uid = userService.uid;
    this.announcelist = this.db.list('announceMissing/', {
      query: {
        limitToLast:9
      }
    }
    ).map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostMainPage');
  }
  lostInformTapped() { 
    var numChild;
    var ref = firebase.database().ref('dogs/')
    ref.orderByChild('uid').equalTo(this.uid).on('value', ((data) => {
      numChild = data.numChildren();
      if (numChild == 0) {
        this.navCtrl.push(LostInformPage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'คุณมีสุนัขเพิ่มไว้ในระบบ',
          message: 'ต้องการสร้างประกาศจากข้อมูลสุนัขที่มีหรือไม่?',
          buttons: [
            {
              text: 'ไม่',
              role: 'cancel',
              handler: () => {
                this.navCtrl.push(LostInformPage);
              }
            },
            {
              text: 'ใช่',
              handler: () => {
                this.navCtrl.push(MyDogPage);
              }
            }
          ]
        });
        alert.present();
      }
    })) 
  }
  lostAnnounce() { 
    this.navCtrl.push(LostAnnouncePage);
  }
  foundInformTapped() { 
    this.navCtrl.push(InformFoundPage);
  }
  goToFoundAnnouncePage() {
    this.navCtrl.push(FoundAnnouncePage);
  }
  goToAnnouceDetail(dogName,breed,gender,age_year,age_month,age_week,dogDetail,photo,contactMiss,reward,uid,key) {
    this.navCtrl.push(LostAnnounceDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week:age_week,
      dogDetail: dogDetail,
      photo:photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid,
      key:key
    })
    console.log(age_year)
    console.log(age_month)
    console.log(age_week)
  }
}
