import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { MyDogDetailPage} from '../my-dog-detail/my-dog-detail'

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
  goToDogDetail(dogName,breed,gender,age,detail,photo,status,lat,lng) {
    this.navCtrl.push(MyDogDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      detail: detail,
      photo: photo,
      status: status,
      lat: lat,
      lng:lng
    })
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreedListPage');
  }

}
