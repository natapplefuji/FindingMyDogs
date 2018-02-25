import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MyNotiDetailPage} from '../my-noti-detail/my-noti-detail';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
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

  dogPhoto:string[]
  notiList
  notidetail
  notiTest:any = []
  index=0
  constructor(private userService: UserServiceProvider, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    let uid = userService.uid;
    this.notiList = db.list('notification/', { query: { orderByChild: 'uid', equalTo: uid } });
    this.notiList.forEach(element => {
      this.create(element,element.length)
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
  create(element,length) { 
    for (var index = 0; index < length; index++) {
      var element2 = element[index].announceFoundKey;
      console.log(element2)
      this.notidetail = this.db.object('announceFound/' + element2).subscribe(user => {
        this.notiTest.push(user)
        console.log(this.notiTest)
        console.log(user)
      });;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotiPage');
  }

}
