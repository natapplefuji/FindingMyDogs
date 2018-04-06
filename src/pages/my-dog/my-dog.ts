import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AddMyDogPage } from '../add-my-dog/add-my-dog';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { MyDogDetailPage } from '../my-dog-detail/my-dog-detail'
import { LostModalPage } from '../lost-modal/lost-modal'
import { AdoptModalPage } from '../adopt-modal/adopt-modal'
/**
 * Generated class for the MyDogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-dog',
  templateUrl: 'my-dog.html',
})
export class MyDogPage {
  dogList: FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController,private userService: UserServiceProvider,private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.dogList = db.list('dogs/', { query: { orderByChild: 'uid', equalTo: uid } });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogPage');
  }
  goToAddDog() {
    this.navCtrl.push(AddMyDogPage);
  }
  createLost(dogName,breed,detail,gender,photo,age_week,age_month,age_year,lat,lng,photoName,dogKey) {
    let lostModal = this.modalCtrl.create('LostModalPage', {
      dogName:dogName,
      breed :breed,
      detail:detail,
      gender:gender,
      photo:photo,
      age_week:age_week,
      age_month:age_month,
      age_year:age_year,
      lat:lat,
      lng: lng,
      photoName: photoName,
      dogKey: dogKey
    })
    lostModal.present();
  }
  createAdopt(dogName,breed,detail,gender,photo,age_week,age_month,age_year,lat,lng,photoName,dogKey) {
    let adoptModal = this.modalCtrl.create('AdoptModalPage', {
      dogName:dogName,
      breed :breed,
      detail:detail,
      gender:gender,
      photo:photo,
      age_week:age_week,
      age_month:age_month,
      age_year:age_year,
      lat:lat,
      lng: lng,
      photoName: photoName,
      dogKey: dogKey
    })
    adoptModal.present();
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
}
