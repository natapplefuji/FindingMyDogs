import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import {AdoptDetailPage} from '../adopt-detail/adopt-detail';

/**
 * Generated class for the BreedListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breed-list',
  templateUrl: 'breed-list.html',
})
export class BreedListPage {
  breed;
  breedList: FirebaseListObservable<any>
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.breed = this.navParams.get('breed');
    this.breedList = db.list('announceAdopt/', {
          query: {
            orderByChild: 'breed',
            equalTo: this.breed
          }
        })
  }
  goToAnnouceDetail(dogName, breed, gender, age_year,age_month,age_week, dogDetail, photo, contactMiss, uid, adoptKey) {
    this.navCtrl.push(AdoptDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week: age_week,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      uid: uid,
      adoptKey: adoptKey
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreedListPage');
  }

}
