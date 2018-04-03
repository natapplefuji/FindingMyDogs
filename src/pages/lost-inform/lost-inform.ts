import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform,ToastController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { DatabaseProvider } from '../../providers/database/database'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { BreedProvider } from '../../providers/breed/breed'
import { LocationProvider } from '../../providers/location/location'
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';
/**
 * Generated class for the LostInformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-inform',
  templateUrl: 'lost-inform.html',
})
export class LostInformPage {
  private announcelost: FormGroup;
  uid;
  breed;
  uploadedImage: any = null;
  date = new Date();
  day;
  month;
  year;
  milliTime;
  dogPicture;
  photoName;
  district = ''
  province =''
  country =''
  loc = { lat: 0, lng: 0 };
  constructor(
    private toastCtrl: ToastController,
    public platform: Platform,
    public _loc: LocationProvider,
    private loadingCtrl: LoadingController,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
    private userService: UserServiceProvider,
    private image: ImageProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private _breed: BreedProvider) {
    this.uid = userService.uid;
    this.breed = _breed.breeds;
    this.announcelost = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      contactMiss: [''],
      dogDetail: [''],
      reward: [''],
      age_year: ['0'],
      age_month: ['0'],
      age_week: ['0'],
    });
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.platform.ready().then(() => {
      _loc.getLocation().then(data => {
        this.loc.lat = data.coords.latitude;
        this.loc.lng = data.coords.longitude;
        this.getGeoRequest()
      }).catch((err) => {
        console.log(err.code +" "+ err.message)
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMyDogPage');
  }
  addAnnounceLost() {
    if (this.uploadedImage == null) {
      this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
        .then((snapshot: any) => {
          this.uploadedImage = snapshot.downloadURL;
          this.photoName = this._DB.imageName;
          var myRef = this.db.database.ref('/announceMissing').push()
          var key = myRef.key
          this.db.database.ref('/announceMissing/' + key).set({
            uid: this.uid,
            announcelostid: key,
            dogName: this.announcelost.value.dogName,
            breed: this.announcelost.value.breed,
            gender: this.announcelost.value.gender,
            contactMiss: this.announcelost.value.contactMiss,
            dogDetail: this.announcelost.value.dogDetail,
            reward: this.announcelost.value.reward,
            photo: this.uploadedImage,
            photoName: this.photoName,
            day: this.day,
            month: this.month,
            year: this.year,
            millisec: this.milliTime,
            lat: this.loc.lat,
            lng: this.loc.lng,
            district: this.district,
            province:this.province,
            country: this.country,
            age_year: this.announcelost.value.age_year,
            age_month: this.announcelost.value.age_month,
            age_week: this.announcelost.value.age_week,
            status:'lost'//lost เป็น default/update เป็น found เมื่อพบเจ้าของแล้ว
          }).then(() => {
            let toast = this.toastCtrl.create({
              message: 'เพิ่มประกาศในระบบเรียบร้อยแล้ว',
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.navCtrl.pop()
          })
        })
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'โปรดเลือกแหล่งที่มา',
      buttons: [
        {
          text: 'คลังรูปภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((data) => {
              this.dogPicture = data;
            });

          }
        },
        {
          text: 'กล้องถ่ายภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.CAMERA).then((data) => {
              this.dogPicture = data;
            });
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  getGeoRequest() { 
    let req = {
      position: {
        lat: this.loc.lat,
        lng: this.loc.lng
      }
    }
    Geocoder.geocode(req).then(
      (res) => {
        this.district = res[0]['subLocality']
        this.province = res[0]['locality']
        this.country = res[0]['country']
      });
  }

}
