import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,ModalController,,AlertController,ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions,GoogleMapsEvent, LatLng, MarkerOptions, Marker, CameraPosition } from '@ionic-native/google-maps';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database-deprecated'
import { ModalPage } from '../modal/modal';
/**
 * Generated class for the MyNotiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-noti-detail',
  templateUrl: 'my-noti-detail.html',
})
export class MyNotiDetailPage {
  @ViewChild('map') element: ElementRef;
  notiDetail = {
      breed: '',
      contactMiss: '',
      day: '',
      dogDetail: '',
      dogWithYou: '',
      lat: '',
      lng: '',
      month: '',
      photo: '',
      year: '',
      district: '',
      province:''
  }
  founderDetail = {
    displayName: '',
    email: '',
    tel: '',
    playerID:''
  }
  loc = {
    lat: 0,
    lng: 0
  }
  notiAnnounce: FirebaseObjectObservable<any>
  annouceFound: FirebaseObjectObservable<any>
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public googleMaps: GoogleMaps, public platform: Platform, public modalCtrl: ModalController,private alertCtrl: AlertController,private toastCtrl: ToastController) {
    
    let annouceFoundDetailKey = navParams.get("annouceFoundDetailKey");
    var notiKey =  navParams.get("notiKey");
    
    this.db.object('announceFound/' + annouceFoundDetailKey).subscribe(data => {
      this.notiDetail.breed = data.breed
      this.notiDetail.contactMiss = data.contactMiss
      this.notiDetail.day = data.day
      this.notiDetail.dogDetail = data.dogDetail
      this.notiDetail.dogWithYou = data.dogWithYou
      this.notiDetail.lat = data.lat
      this.notiDetail.lng = data.lng
      this.loc.lat = +data.lat
      this.loc.lng = +data.lng
      this.notiDetail.month = data.month
      this.notiDetail.photo = data.photo
      this.notiDetail.year = data.year
      this.notiDetail.district = data.district
      this.notiDetail.province = data.province
    })
    this.db.object('userProfile/' + navParams.get('founder')).subscribe(user => { 
      this.founderDetail.displayName = user.displayName
      this.founderDetail.email = user.email
      this.founderDetail.tel = user.tel
      if (user.playerID != null) {
        this.founderDetail.playerID=user.playerID
      }
      
    })
    //อ้างถึงประกาศนั้นๆ
    this.notiAnnounce = db.object('notification/'+notiKey)
    this.annouceFound = db.object('announceFound/'+annouceFoundDetailKey)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDogDetailPage');
    this.platform.ready().then(() => {
      this.initMap();
    });
  }
  initMap() {

    var mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.notiDetail.lat,
          lng: this.notiDetail.lng
        },
        zoom: 16,
      }
    };
    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement, mapOptions);
    
    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
  
      let markerOptions: MarkerOptions = {
        position: this.loc,
        icon: "assets/images/icons8-Marker-64.png",
        title: 'พบสุนัขบริเวณนี้'
      };
  
      const marker = map.addMarker(markerOptions)
        .then((marker: Marker) => {
          marker.showInfoWindow();
        });

    })
  }
  notifyFounder() { 
    let alert2 = this.alertCtrl.create({
      title: 'พบสุนัข?',
      message: 'ได้รับสุนัขคืนแล้วใช่หรือไม่',
      buttons: [
        {
          text: 'ไม่ใช่',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.notiAnnounce.update({ status: 'found' });
            this.annouceFound.update({ status: 'found' });
            //notiไปยังคนพบ
            var founderPlayerIDList = [];
            founderPlayerIDList.push(this.founderDetail.playerID)
            var notificationObj = {
              contents: {
                en: "Dog's owner accept your annouce that is his/her dog",
                th: "เจ้าของยืนยันว่าเป็นสุนัขของเขา"
              },
              include_player_ids: founderPlayerIDList
            };
            window["plugins"].OneSignal.postNotification(notificationObj,
              (successResponse) => {
                //alert("Notification Post Success:" + JSON.stringify(playerIDList));
                let toast = this.toastCtrl.create({
                  message: 'ยินดีด้วยคุณพบสุนัขแล้ว',
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              },
              (failedResponse) => {
                alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
              }
            );
          }
        }
      ]
    });
    alert2.present();
  }

  denyFounder() { 
    let alert = this.alertCtrl.create({
      title: 'ไม่ใช่สุนัขของฉัน',
      message: 'หากนี่ไม่ใช่สุนัขของคุณกรุณากด "ลบประกาศ" ระบบจะทำการลบประกาศแจ้งเตือนนี้',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            
          }
        },
        {
          text: 'ลบประกาศ',
          handler: () => {
            this.notiAnnounce.remove();
            
            let toast = this.toastCtrl.create({
              message: 'ลบประกาศแจ้งเตือนเรีบยร้อย',
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

}
