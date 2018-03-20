import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  uid;
  result = [];
  constructor(public authProvider: AuthProvider, public navCtrl: NavController, public userService: UserServiceProvider, private db: AngularFireDatabase) {
    this.uid = userService.uid;
    this.checkVaccineNoti();
  }
  checkVaccineNoti() {
    var dog = {};
    var date = new Date().getTime();
    var notiList = firebase.database().ref('userProfile/' + this.uid + '/notiTime')
    notiList.once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        var obj = childSnapshot.val();
        dog = {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] <= date) {
              dog[key] = obj[key];
            }
          }
        }
        dog["dogID"] = childSnapshot.key; //เก็บว่าเป็นตารางวัคซีนของหมาตัวไหนหมาตัวไหน
        this.result.push(dog);
      })
      this.createVaccineNoti();
    })

  }
  createVaccineNoti() {
    var mykey;
    for (let i = 0; i < this.result.length; i++) {
      if (Object.keys(this.result[i]).length > 1) {
        for (var key in this.result[i]) {
          if (key != "dogID") {
            mykey = key;
            this.db.database.ref('notiVaccine/').push().set({
              uid:this.uid,
              dogID: this.result[i].dogID,
              vaccine: key,
              time: this.result[i][key]
            }).then(() => {
              this.db.database.ref('userProfile/' + this.uid + '/notiTime/' + this.result[i].dogID).child(mykey).remove();
            })
          }
        }
      }
    }
  }
  lostTapped() {
    this.navCtrl.push(LostMainPage);
  }
  adoptTapped() {
    this.navCtrl.push(AdoptGetPage);
  }

  lostAnnounce() {
    this.navCtrl.push(LostAnnouncePage);
  }
  adoptMore() {
    this.navCtrl.push(AdoptGetPage);
  }

}
