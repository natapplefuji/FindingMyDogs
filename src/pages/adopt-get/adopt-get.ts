import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'
import { MyDogDetailPage } from '../my-dog-detail/my-dog-detail'
/**
 * Generated class for the AdoptGetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-get',
  templateUrl: 'adopt-get.html',
})
export class AdoptGetPage {
  location: string
  announcelistAll:FirebaseListObservable<any>;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.location = "nearby";
    this.announcelistAll = this.db.list('announceAdopt/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptGetPage');
  }
  goToDogDetail(dogName,breed,gender,age,dogDetail,photo,status) {
    this.navCtrl.push(MyDogDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      detail: dogDetail,
      photo:photo,
      status: status
    })
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'เลือกประเภทที่ต้องการค้นหา',
      inputs: [
        {
          label: 'ทั้งหมด',
          value: 'all',
          type: 'radio',
          checked:true
        },
        {
          label: 'ขนาดตัว',
          value: 'size',
          type: 'radio'
        },
        {
          label: 'พื้นที่ในการเลี้ยง',
          value: 'areaRequire',
          type: 'radio'
        },
        {
          label: 'ความทนร้อน',
          value: 'hotResist',
          type: 'radio'
        },
        {
          label: 'ความทนหนาว',
          value: 'coldResist',
          type: 'radio'
        },
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
       
      ]
    });
    alert.present();
  }
}
