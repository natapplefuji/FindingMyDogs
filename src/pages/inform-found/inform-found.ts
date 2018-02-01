import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { LostInformThankPage } from '../lost-inform-thank/lost-inform-thank';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database'
import { ImageProvider } from '../../providers/image/image'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the InformFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inform-found',
  templateUrl: 'inform-found.html',
})
export class InformFoundPage {
  private infoFound: FormGroup;
  announceFound: FirebaseListObservable<any>;
  uid;
  breed = 'default'
  uploadedImage;
  photoName = 'default';
  dogPicture: string;
  date = new Date();
  day;
  month;
  year;
  milliTime;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private image: ImageProvider,
    private userService: UserServiceProvider,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {
    this.announceFound = af.list('/announceMissing');
    this.uid = userService.uid;
    this.infoFound = this.formBuilder.group({
      contactMiss: ['', Validators.required],
      dogDetail: ['', Validators.required],
      dogWithYou: ['', Validators.required]
    });
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    console.log('date is '+this.day+'/'+this.month+'/'+this.year+' at millitime: '+this.milliTime);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InformFoundPage');
  }
  addAnnounce() {
    if (this.uploadedImage == null) {

      this._DB.uploadImageDog(this.dogPicture).then((snapshot: any) => {
        this.uploadedImage = snapshot.downloadURL;
        this.photoName = this._DB.imageName;
        this.db.database.ref('/announceFound').push().set({
          founder: this.uid,
          breed: this.breed,
          contactMiss: this.infoFound.value.contactMiss,
          dogDetail: this.infoFound.value.dogDetail,
          dogWithYou: this.infoFound.value.dogWithYou,
          photo: this.uploadedImage,
          photoName: this.photoName,
          day: this.day,
          month: this.month,
          year: this.year,
          millisec: this.milliTime

        }).then(() => { this.navCtrl.push(LostInformThankPage, { photo: this.photoName }) })
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
  getImage() {

    this.presentActionSheet();
  }

  cancelForm() {
    this.navCtrl.pop();
  }



}
