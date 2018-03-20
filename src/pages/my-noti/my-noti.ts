import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyNotiDetailPage } from '../my-noti-detail/my-noti-detail';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { VaccineDetailPage } from '../vaccine-detail/vaccine-detail'
/**
 * Generated class for the MyNotiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-noti',
  templateUrl: 'my-noti.html',
})
export class MyNotiPage {

  dogPhoto: string[]
  notiList
  notidetail
  notiVaccine
  notidetail2

  annouceFound: any = []
  dogObject:any = []
  index = 0
  index2 = 0;
  constructor(private userService: UserServiceProvider, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.notiList = db.list('notification/', { query: { orderByChild: 'uid', equalTo: uid } }); //noti missing/adopt
    this.notiVaccine = db.list('notiVaccine/', { query: { orderByChild: 'uid', equalTo: uid } });
    this.notiList.forEach(element => {
      this.getFirebaseProperty(element, element.length)
    });
    this.notiVaccine.forEach(element => {
      this.getFirebaseProperty2(element, element.length)
    });

    // this.dogPhoto= ["assets/img/scroll0015.jpg","assets/img/labrado2.jpg","assets/img/dog_test.jpeg"]
  }

  // goToDogDetail(dogName,breed,gender,age,detail,photo,status) {
  //   this.navCtrl.push(MyNotiDetailPage, {
  //     breed: ["Labrador","Labrador","Labrador"],
  //     photo:["assets/img/scroll0015.jpg","assets/img/scroll0015.jpg","assets/img/dog_test.jpeg"],
  //     status: ["อยู่กับผู้พบ","อยู่กับผู้พบ","อยู่กับผู้พบ"]
  //   })
  // }
  getFirebaseProperty(element, length) {
    for (var index = 0; index < length; index++) {
      var key = element[index].announceFoundKey;
      // console.log(element2)
      this.notidetail = this.db.object('announceFound/' + key).subscribe(user => {
        this.annouceFound.push(user)
        // console.log(this.annouceFound)
        // console.log(user)
      });;
    }
  }
  getFirebaseProperty2(element, length) {
    console.log(length);
    for (var index = 0; index < length; index++) {
      var key = element[index].dogID;
      this.notidetail2 = this.db.object('dogs/' + key).subscribe(dog => {
        this.dogObject.push(dog)
      });
    }
    console.log(this.dogObject)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotiPage');
  }
  goToVaccineDetail(vaccine,time,index) {
    this.navCtrl.push(VaccineDetailPage, {
      vaccine: vaccine,
      time: time,
      dogObject:this.dogObject[index]
    })
  }
  goToNotiDetail(dogName, breed, gender, age, detail, photo, status, lat, lng) {
    this.navCtrl.push(MyNotiDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      detail: detail,
      photo: photo,
      status: status,
      lat: lat,
      lng: lng
    })
  }
}
