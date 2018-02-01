import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { DatabaseProvider } from '../../providers/database/database'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { BreedProvider} from '../../providers/breed/breed'
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
  constructor(private loadingCtrl: LoadingController,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
    private userService: UserServiceProvider,
    private image: ImageProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private _breed :BreedProvider) {
    this.uid = userService.uid;
    this.breed = _breed.breeds;
    this.announcelost = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      contactMiss: [''],
      dogDetail: [''],
      reward: [''],
    });
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
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
          this.db.database.ref('/announceMissing').push().set({
            uid: this.uid,
            dogName: this.announcelost.value.dogName,
            breed: this.announcelost.value.breed,
            gender: this.announcelost.value.gender,
            age: this.announcelost.value.age,
            contactMiss: this.announcelost.value.contactMiss,
            dogDetail: this.announcelost.value.dogDetail,
            reward: this.announcelost.value.reward,
            photo: this.uploadedImage,
            photoName: this.photoName,
            day: this.day,
            month: this.month,
            year: this.year,
            millisec: this.milliTime
          }).then(() => { this.navCtrl.pop() })
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


}
