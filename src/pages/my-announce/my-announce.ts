import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { LostAnnounceDetailPage } from '../lost-announce-detail/lost-announce-detail';
import { ModalController } from 'ionic-angular';
import { UpdateAnnouceLostPage } from '../update-annouce-lost/update-annouce-lost';
import { UpdateAnnouceAdoptPage } from '../update-annouce-adopt/update-annouce-adopt';
import { ToastController } from 'ionic-angular';
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
  constructor(private userService: UserServiceProvider,private db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,private alertCtrl: AlertController,private toastCtrl: ToastController) {
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
  goToAnnouceDetail(dogName,breed,gender,age,dogDetail,photo,contactMiss,reward,uid) {
    this.navCtrl.push(LostAnnounceDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo:photo,
      contactMiss: contactMiss,
      reward: reward,
      uid:uid
    })
  }
  openUpdateAnnouceLost(dogName,breed,gender,age,dogDetail,photo,contactMiss,reward,uid,key) {
    let obj = {
      key:key,
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo:photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid
    };
    console.log(obj.key)
    let myModal = this.modalCtrl.create(UpdateAnnouceLostPage,obj);
    myModal.present();
  }

  openUpdateAnnouceAdopt(dogName,breed,gender,age,dogDetail,photo,contactMiss,uid,key) {
    let obj = {
      key:key,
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo:photo,
      contactMiss: contactMiss,
      uid: uid
    };
    console.log(obj.key)
    let myModal = this.modalCtrl.create(UpdateAnnouceAdoptPage,obj);
    myModal.present();
  }
  deleteAnnounceAdopt(key) { 
    let alert = this.alertCtrl.create({
      title: 'ลบประกาศ',
      message: 'หากต้องการลบประกาศรุณากดตกลง',
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
  deleteAnnounceMissing(key) { 
    let alert = this.alertCtrl.create({
      title: 'ลบประกาศ',
      message: 'หากต้องการลบประกาศรุณากดตกลง',
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
            this.db.object('announceMissing/'+key).remove();
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
