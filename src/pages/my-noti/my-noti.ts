import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyNotiDetailPage } from '../my-noti-detail/my-noti-detail';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { VaccineDetailPage } from '../vaccine-detail/vaccine-detail'
import { MyNotiDetailAdoptPage } from '../my-noti-detail-adopt/my-noti-detail-adopt';
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
  notiVaccine
  notiAdopt
  annouceFound: any = []
  dogObject: any = []
  announceAdopter: any = []
  announceAdoptDetail = []
  index = 0
  index2 = 0;
  constructor(private userService: UserServiceProvider, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.notiList = db.list('notification/', { query: { orderByChild: 'uid', equalTo: uid } }); //noti missing
    this.notiVaccine = db.list('notiVaccine/', { query: { orderByChild: 'uid', equalTo: uid } });
    this.notiAdopt = db.list('notificationAdopt/', { query: { orderByChild: 'uid', equalTo: uid } });//noti adopt
    this.notiList.forEach(element => {
      this.getFirebaseProperty(element, element.length)
    });
    this.notiVaccine.forEach(element => {
      this.getFirebaseProperty2(element, element.length)
    });
    this.notiAdopt.forEach(element => {
      this.getFirebaseProperty3(element, element.length)
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
  getFirebaseProperty(element, length) { //ของ lost announcement
    for (var index = 0; index < length; index++) {
      var key = element[index].announceFoundKey;
      // console.log(element2)
      this.db.object('announceFound/' + key).subscribe(user => {
        this.annouceFound.push(user)
        // console.log(this.annouceFound)
        // console.log(user)
      })
    }
  }
  getFirebaseProperty2(element, length) { //ของ วัคซีน
    for (var index = 0; index < length; index++) {
      var key = element[index].dogID;
       this.db.object('dogs/' + key).subscribe(dog => {
        this.dogObject.push(dog)
      });
    }
  }
  getFirebaseProperty3(element, length) { //ของ adopt announcement
    for (var index = 0; index < length; index++) {
      var key = element[index].adopter;
      var keyAnnounce = element[index].adoptAnnounceKey
      this.db.object('userProfile/' + key).subscribe(user => {
        this.announceAdopter.push(user);
      });
      this.db.object('announceAdopt/' + keyAnnounce).subscribe(data => {
        this.announceAdoptDetail.push(data);
      });
    }
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
  goToNotiDetailLost(annouceFoundDetailKey,notiKey,founder) {
    this.navCtrl.push(MyNotiDetailPage, {
      annouceFoundDetailKey:annouceFoundDetailKey,
      notiKey: notiKey,
      founder:founder
    })
  }
  goToNotiDetailAdopt(photo, dogName, breed, adopterFirstName, adopterLastName, adopterEmail, adopterTel,key,adoptAnnounceKey) {
    this.navCtrl.push(MyNotiDetailAdoptPage, {
      photo: photo,
      dogName: dogName,
      breed: breed,
      adopterFirstName: adopterFirstName,
      adopterLastName:adopterLastName,
      adopterEmail: adopterEmail,
      adopterTel: adopterTel,
      key: key,
      adoptAnnounceKey:adoptAnnounceKey
    })
  }
}
