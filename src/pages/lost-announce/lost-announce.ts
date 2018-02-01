import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { MyDogDetailPage } from '../my-dog-detail/my-dog-detail'
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
  
  goToDogDetail(dogName,breed,gender,age,dogDetail,photo,status) {
    this.navCtrl.push(MyDogDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      detail: dogDetail,
      photo:photo,
      status: status
    })
  }
}
