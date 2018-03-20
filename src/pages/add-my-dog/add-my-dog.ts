import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { DatabaseProvider } from '../../providers/database/database'
import { MyDogPage } from '../my-dog/my-dog'
import { BreedProvider } from '../../providers/breed/breed';
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { LocationProvider } from '../../providers/location/location'
import { VaccineProvider } from '../../providers/vaccine/vaccine'
/**
 * Generated class for the AddMyDogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-my-dog',
  templateUrl: 'add-my-dog.html',
})
export class AddMyDogPage {

  private dog: FormGroup;
  uid: '';
  dogPicture: string;
  dog_image_dataurl: string = null;
  uploadedImage: string;
  photoName: string;
  date = new Date();
  day;
  month;
  year;
  milliTime;
  breed;
  dogKey;
  loc = { lat: 0, lng: 0 };
  constructor(public vaccine: VaccineProvider,public _breed: BreedProvider, public platform: Platform, public _loc: LocationProvider, private loadingCtrl: LoadingController, private camera: Camera, public actionSheetCtrl: ActionSheetController, private _DB: DatabaseProvider, private db: AngularFireDatabase, private userService: UserServiceProvider, private image: ImageProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = userService.uid;
    this.breed = _breed.breeds;
    this.dog = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      age_year: ['0',],
      age_month: ['0',],
      age_week: ['0',],
      detail: [''],
      vaccineNoti : ['false']
    });
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.platform.ready().then(() => {
      _loc.getLocation().then(data => {
        this.loc.lat = data.coords.latitude;
        this.loc.lng = data.coords.longitude;
      })
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMyDogPage');
  }
  addDog() {
    //test serve
    console.log('today is ' + new Date().toString())
    if (this.uploadedImage == null) {
      this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
        .then((snapshot: any) => {
          this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
          console.log(snapshot.downloadURL)
          this.photoName = this._DB.imageName;
          var dogRef = this.db.database.ref('/dogs').push();
          this.dogKey = dogRef.key;
          this.db.database.ref('/dogs/'+this.dogKey).set({
            uid: this.uid,
            dogName: this.dog.value.dogName,
            breed: this.dog.value.breed,
            gender: this.dog.value.gender,
            detail: this.dog.value.detail,
            photo: this.uploadedImage,
            photoName: this.photoName,
            status: 'ปลอดภัย',
            day: this.day,
            month: this.month,
            year: this.year,
            millisec: this.milliTime,
            lat: this.loc.lat,
            lng: this.loc.lng
          }).then(() => {
            if (this.dog.value.vaccineNoti == true) {
              this.callVaccine();
            }
            this.navCtrl.pop()
          })
        })
    }
    if (this.uploadedImage == null) {
      this.uploadedImage = 'assets/img/dog_test.jpeg';
    }
  }
  
  callVaccine() {
    var year = parseInt(this.dog.value.age_year);
    var month = parseInt(this.dog.value.age_month);
    var week = parseInt(this.dog.value.age_week);
    this.vaccine.setupVaccine(year,month,week,this.uid,this.dogKey);
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

  getImage() {
    this.presentActionSheet();
    //ได้ภาพ base64
    console.log("get" + this.dogPicture)
    // this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
    //   .then((snapshot: any) => {
    //     this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
    //     console.log(snapshot.downloadURL)
    //     this.photoName = this._DB.imageName;  
    //   })  
    //   console.log(this.uploadedImage)
  }
}
