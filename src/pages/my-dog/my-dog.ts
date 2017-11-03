import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddMyDogPage } from '../add-my-dog/add-my-dog';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { MyDogDetailPage} from '../my-dog-detail/my-dog-detail'
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

  constructor(private userService: UserServiceProvider,private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.dogList = db.list('dogs/', { query: { orderByChild: 'uid', equalTo: uid } });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogPage');
  }
  goToAddDog() {
    this.navCtrl.push(AddMyDogPage);
  }
  goToDogDetail(dogName,breed,gender,age,detail,photo,status) {
    this.navCtrl.push(MyDogDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      detail: detail,
      photo:photo,
      status: status
    })
  }
}
