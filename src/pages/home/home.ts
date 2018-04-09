import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  uid;
  result = [];
  displayName = '';
  date = new Date().getDate();
  month = new Date().getMonth() + 1
  monthTH = '';
  year = new Date().getFullYear();
  lostList: FirebaseListObservable<any>;
  adoptList: FirebaseListObservable<any>;
  constructor(private browser: InAppBrowser,public authProvider: AuthProvider, public navCtrl: NavController, public userService: UserServiceProvider, private db: AngularFireDatabase) {
    this.uid = userService.uid;
    this.db.database.ref('userProfile/' + this.uid).on('value', (data) => {
      this.displayName = data.val().displayName;
    })
    this.checkVaccineNoti();
    switch (this.month) {
      case 1: this.monthTH = "มกราคม";
        break;
      case 2: this.monthTH = "กุมภาพันธ์";
        break;
      case 3: this.monthTH = "มีนาคม";
        break;
      case 4: this.monthTH = "เมษายน";
        break;
      case 5: this.monthTH = "พฤษภาคม";
        break;
      case 6: this.monthTH = "มิถุนายน";
        break;
      case 7: this.monthTH = "กรกฎาคม";
        break;
      case 8: this.monthTH = "สิงหาคม";
        break;
      case 9: this.monthTH = "กันยายน";
        break;
      case 10: this.monthTH = "ตุลาคม";
        break;
      case 11: this.monthTH = "พฤศจิกายน";
        break;
      case 12: this.monthTH = "ธันวาคม";
        break;
    }
    this.lostList = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'status',
        equalTo: 'lost',
        limitToLast: 4
      }
    }
    ).map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;
    this.adoptList = this.db.list('announceAdopt/', {
      query: {
        orderByChild: 'status',
        equalTo: 'wait',
        limitToLast: 4
      }
    }
    ).map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;
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
              uid: this.uid,
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
  openBrowser(url){
    this.browser.create(url);
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
