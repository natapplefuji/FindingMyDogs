import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ModalController } from 'ionic-angular';
import { UpdateAnnouceLostPage } from '../update-annouce-lost/update-annouce-lost';
import { UpdateAnnouceAdoptPage } from '../update-annouce-adopt/update-annouce-adopt';
import { ToastController } from 'ionic-angular';
import { MyAnnounceLostDetailPage } from '../my-announce-lost-detail/my-announce-lost-detail';
import { MyAnnounceAdoptDetailPage } from '../my-announce-adopt-detail/my-announce-adopt-detail';
/**
 * Generated class for the MyAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-announce',
  templateUrl: 'my-announce.html',
})
export class MyAnnouncePage {
  announceMissingList
  announceAdoptList
  constructor(private userService: UserServiceProvider, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    let uid = userService.uid;
    this.announceMissingList = db.list('announceMissing/', { query: { orderByChild: 'uid', equalTo: uid } });
    this.announceAdoptList = db.list('announceAdopt/', { query: { orderByChild: 'uid', equalTo: uid } });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAnnouncePage');

  }
  getList() {
    console.log(this.announceMissingList)
    console.log(this.announceMissingList)
  }
  goToAnnouceLostDetail(dogName, breed, gender, age_year, age_month, age_week, dogDetail, photo, contactMiss, reward, uid) {
    this.navCtrl.push(MyAnnounceLostDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week: age_week,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid
    })
  }
  goToAnnouceAdoptDetail(dogName, breed, gender, age_year, age_month, age_week, dogDetail, photo, contactMiss, uid) {
    this.navCtrl.push(MyAnnounceAdoptDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age_year: age_year,
      age_month: age_month,
      age_week: age_week,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      uid: uid
    })
  }
  openUpdateAnnouceLost(dogName, breed, gender, ageyear, agemonth, ageweek, dogDetail, photo, contactMiss, reward, uid, key) {
    let obj = {
      key: key,
      dogName: dogName,
      breed: breed,
      gender: gender,
      ageyear: ageyear,
      agemonth: agemonth,
      ageweek: ageweek,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid
    };

    let myModal = this.modalCtrl.create(UpdateAnnouceLostPage, obj);
    myModal.present();
  }

  openUpdateAnnouceAdopt(dogName, breed, gender, ageyear, agemonth, ageweek, dogDetail, photo, contactMiss, uid, key) {
    let obj = {
      key: key,
      dogName: dogName,
      breed: breed,
      gender: gender,
      ageyear: ageyear,
      agemonth: agemonth,
      ageweek: ageweek,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      uid: uid,
    };
    console.log(obj.key)
    let myModal = this.modalCtrl.create(UpdateAnnouceAdoptPage, obj);
    myModal.present();
  }
  deleteAnnounceAdopt(key, dogName) {
    console.log(dogName);
    let alert = this.alertCtrl.create({
      title: 'ลบประกาศ',
      message: 'หากต้องการลบประกาศกรุณากดตกลง',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            console.log(key)
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.db.database.ref('dogs/').orderByChild('dogName').equalTo(dogName).once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot)=>{
                childSnapshot.ref.update({ status: 'ปลอดภัย' });
              });
            });
            this.db.object('announceAdopt/' + key).remove();
            let toast = this.toastCtrl.create({
              message: 'ลบข้อมูลเรียบร้อยแล้ว',
              duration: 2000,
              position: 'top'
            });

            // toast.onDidDismiss(() => {
            //   console.log('Dismissed toast');
            // });

            toast.present();
          }
        }
      ]
    });
    alert.present();
  }
  deleteAnnounceMissing(key, dogName) {
    let alert = this.alertCtrl.create({
      title: 'ลบประกาศ',
      message: 'หากต้องการลบประกาศกรุณากดตกลง',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            console.log(key)
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.db.database.ref('dogs/').orderByChild('dogName').equalTo(dogName).once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot)=>{
                childSnapshot.ref.update({ status: 'ปลอดภัย' });
              });
            });
            this.db.object('announceMissing/' + key).remove();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
