import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated'
/**
 * Generated class for the MyNotiDetailAdoptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-noti-detail-adopt',
  templateUrl: 'my-noti-detail-adopt.html',
})
export class MyNotiDetailAdoptPage {
  photo
  dogName
  breed
  adopterFirstName
  adopterLastName
  adopterEmail
  adopterTel
  announce: FirebaseObjectObservable<any>
  key //key คนขออุปการะ
  adoptAnnounceKey //key ตัวประกาศอุปการะ
  constructor(private toastCtrl: ToastController,private db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.photo = this.navParams.get('photo');
    this.dogName = this.navParams.get('dogName');
    this.breed = this.navParams.get('breed');
    this.adopterFirstName = this.navParams.get('adopterFirstName');
    this.adopterLastName = this.navParams.get('adopterLastName');
    this.adopterEmail = this.navParams.get('adopterEmail');
    this.adopterTel = this.navParams.get('adopterTel');
    this.key = this.navParams.get('key');
    this.adoptAnnounceKey = this.navParams.get('adoptAnnounceKey');
    this.announce = db.object('notificationAdopt/'+this.key)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotiDetailAdoptPage');
  }

  notifyAccept() {
    this.announce.update({ isResponded: 'accept' });
    var adopterKey;
    var adopterPlayerID;
    var adopterPlayerIDList = [];
    this.db.database.ref('notificationAdopt/' + this.key).once("value", (snapshot) => {
      adopterKey = snapshot.val().adopter;
      this.db.database.ref('userProfile/' + adopterKey).once("value", (snapshot) => {
        adopterPlayerID = snapshot.val().playerID;
        adopterPlayerIDList.push(adopterPlayerID);
        this.db.database.ref('announceAdopt/'+this.adoptAnnounceKey).update({status:'adopted'})
        var notificationObj = {
          contents: {
            en: "["+this.dogName+"] Your dog adoption request is accepted.",
            th: "["+this.dogName+"] การขอรับอุปการะสุนัขของคุณได้รับการอนุมัติ"
          },
          include_player_ids: adopterPlayerIDList
        };
        
        window["plugins"].OneSignal.postNotification(notificationObj,
          (successResponse) => {
            //alert("Notification Post Success:" + JSON.stringify(playerIDList));
            let toast = this.toastCtrl.create({
              message: 'แจ้งไปยังผู้ขอรับอุปการะเรียบร้อยแล้วค่ะ',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          },
          (failedResponse) => {
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
        );
      })
    })

  }
  notifyDeny() {
    this.announce.update({ isResponded: 'deny' });
    var adopterKey;
    var adopterPlayerID;
    var adopterPlayerIDList = [];
    this.db.database.ref('notificationAdopt/' + this.key).once("value", (snapshot) => {
      adopterKey = snapshot.val().adopter;
      this.db.database.ref('userProfile/' + adopterKey).once("value", (snapshot) => {
        adopterPlayerID = snapshot.val().playerID;
        adopterPlayerIDList.push(adopterPlayerID);
        var notificationObj = {
          contents: {
            en: "["+this.dogName+"] Your dog adoption request is rejected.",
            th: "["+this.dogName+"] การขอรับอุปการะสุนัขของคุณถูกปฏิเสธ"
          },
          include_player_ids: adopterPlayerIDList
        };
    
        window["plugins"].OneSignal.postNotification(notificationObj,
          (successResponse) => {
            //alert("Notification Post Success:" + JSON.stringify(playerIDList));
            let toast = this.toastCtrl.create({
              message: 'แจ้งไปยังผู้ขอรับอุปการะเรียบร้อยแล้วค่ะ',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          },
          (failedResponse) => {
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
        );
      })
    })
  }
}
