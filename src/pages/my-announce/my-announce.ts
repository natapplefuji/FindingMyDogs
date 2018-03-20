import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail';
/**
 * Generated class for the MyAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-announce',
  templateUrl: 'my-announce.html',
})
export class MyAnnouncePage {
  announceMissingList
  announceAdoptList
  constructor(private userService: UserServiceProvider,private db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.announceMissingList = db.list('announceMissing/', { query: { orderByChild: 'uid', equalTo: uid } });
    this.announceAdoptList = db.list('announceAdopt/', { query: { orderByChild: 'uid', equalTo: uid } });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAnnouncePage');

  }
  getList() { 
    console.log(this.announceMissingList)
    console.log(this.announceMissingList)
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
