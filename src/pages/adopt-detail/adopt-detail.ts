import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database-deprecated'
import { UserServiceProvider} from '../../providers/user-service/user-service'
/**
 * Generated class for the AdoptDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-detail',
  templateUrl: 'adopt-detail.html',
})
export class AdoptDetailPage {
  announceDetail = {
    dogName: '',
    breed: '',
    gender: '',
    age: '',
    dogDetail: '',
    photo:'',
    contactMiss: '',
    reward: '',
    uid:'',
    announcer: '',
    key:''
  }
  user: Object = {} 
  userDetail = {
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    photo: '',
    tel: ''
  };
  constructor(private toastCtrl: ToastController,public userService:UserServiceProvider,public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.announceDetail.dogName = navParams.get("dogName");
    this.announceDetail.breed = navParams.get("breed");
    this.announceDetail.gender = navParams.get("gender");
    this.announceDetail.age = navParams.get("age");
    this.announceDetail.dogDetail = navParams.get("dogDetail");
    this.announceDetail.photo = navParams.get("photo");
    this.announceDetail.contactMiss = navParams.get("contactMiss");
    this.announceDetail.uid = navParams.get("uid");
    this.announceDetail.key = navParams.get("adoptKey");
    this.user = this.db.object('/userProfile/' + navParams.get("uid"),{ preserveSnapshot: true})
    .subscribe(snapshot=>{
          this.userDetail.displayName = snapshot.child("displayName").val(),
          this.userDetail.email = snapshot.child("email").val(),
          this.userDetail.firstName = snapshot.child("firstName").val(),
          this.userDetail.lastName = snapshot.child("lastName").val(),
          this.userDetail.photo = snapshot.child("photo").val(),
          this.userDetail.tel = snapshot.child("tel").val()
      });
  }
  askForAdoption() {
    let uid;
    let playerID;// playerID เจ้าของประกาศ
    let playerIDList = [];
    this.db.database.ref('announceAdopt/' + this.announceDetail.key).on("value", (snapshot) => {
      uid = snapshot.val().uid;
      this.db.database.ref('userProfile/' + uid).once('value', (snapshot) => {
        playerID = snapshot.val().playerID;
        playerIDList = [];
        playerIDList.push(playerID);
      })
    })
    this.db.database.ref('notificationAdopt/').push().set({
      uid: uid,//เจ้าของหมา
      adoptAnnounceKey: this.announceDetail.key,//key ของประกาศนี้
      adopter: this.userService.uid, //ผู้ขอรับเลี้ยง
      isResponded:'false'
    }).then(() => {
      var notificationObj = {
        contents: {
          en: "There's someone wants to adopt your dog.",
          th: "มีผู้ต้องการรับอุปการะสุนัขของคุณ"
        },
        include_player_ids: playerIDList
      };
      
      window["plugins"].OneSignal.postNotification(notificationObj,
        (successResponse) => {
          //alert("Notification Post Success:" + JSON.stringify(playerIDList));
          let toast = this.toastCtrl.create({
            message: 'แจ้งไปยังเจ้าของสุนัขเรียบร้อยแล้วค่ะ',
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptDetailPage');
  }

}
