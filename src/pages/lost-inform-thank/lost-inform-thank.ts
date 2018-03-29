import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { PredictProvider } from '../../providers/predict/predict';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
/**
 * Generated class for the LostInformThankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-inform-thank',
  templateUrl: 'lost-inform-thank.html',
})
export class LostInformThankPage {
  dogs: [{
    dogName: string,
    score: string
  }];
  photoDog //to predict
  annouceFoundId //to store founder id
  announcelistRelate: FirebaseListObservable<any>;
  announceBreedRelate: FirebaseListObservable<any>;
  playerIDList = []
  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public _predict: PredictProvider,public loadingCtrl:LoadingController, private db: AngularFireDatabase) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostInformThankPage');
    
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter LostInformThankPage');
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
    if (this.navParams) {
      this.photoDog = this.navParams.get('photo')
      this.annouceFoundId = this.navParams.get('announceFoundId');
      loading.present().then(() => {
        this._predict.getJsonData(this.photoDog).subscribe((data) => {
          this.dogs = data
          loading.dismiss();
          console.log(this.dogs)
          this.getBreed(this.dogs[0].dogName); //fn นี้ต้องเรียกใน then เท่านั้น ไม่งั้นจะไมไ่ด้ทำ (ข้าม)
        });

      })
    }
  }
  
  getBreed(dogPredictBreed) { //1.นำพันธุ์มาลิสจาก db
    this.announcelistRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: dogPredictBreed
      }
    })
    this.announceBreedRelate = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'breed',
        equalTo: dogPredictBreed
      }, preserveSnapshot: true
    })
    this.db.database.ref('/announceFound/'+this.annouceFoundId).update({breed : dogPredictBreed})
    this.getList()
  }
  getList() { //2. นำแต่ละ child ใน list มาเอา uid ของผู้ประกาศหาย + รับ playerID เพื่อเตรียมสร้างประกาศ
    this.announceBreedRelate.subscribe(itemkeys => {
      itemkeys.forEach(itemkey => {
        var uid;
        var playerID : string;
        console.log(itemkey.key);
        this.db.object('announceMissing/' + itemkey.key).subscribe(user => {
          uid = user.uid; //uid ของเจ้าของประกาศหมาหาย
          this.db.object('userProfile/' + uid).subscribe(user => {
            
            playerID = user.playerID;
            console.log('player id is ' + playerID);
            this.playerIDList.push(playerID); //เก็บ list playerID ที่จะต้องทำการ pushNoti
          }) 
          this.createNoti(itemkey.key, uid)  //สร้างประกาศ noti ไปก่อน /ก่อน push แจ้ง      
        });
      });
    })
    
  }

  createNoti(missingKey, uid) {
    let notiRef = this.db.database.ref('/notification')
    notiRef.push().set({
      announceFoundKey: this.annouceFoundId,
      announceMissingKey: missingKey,
      uid: uid,
      status: 'lost'
    })
  }

  pushNoti(playerIDList) { //เรียก fn นี้เพื่อ push ตอนกดเปลี่ยนหน้า /ป้องกัน playerIDList ยังไม่ได้รับข้อมุลครบ
    var notificationObj = {
      contents: {
        en: "Similar Dog was found! Please check..",
        th: "พบสุนัขลักษณะใกล้เคียง โปรดตรวจสอบ.."
      },
      include_player_ids: playerIDList
    };

    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        //alert("Notification Post Success:" + JSON.stringify(playerIDList));
        let toast = this.toastCtrl.create({
          message: 'ขอบคุณสำหรับการแจ้งเบาะแสค่ะ',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        //alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
  }

  goToHome() {
    this.pushNoti(this.playerIDList);
    this.navCtrl.popToRoot();
  }
}
