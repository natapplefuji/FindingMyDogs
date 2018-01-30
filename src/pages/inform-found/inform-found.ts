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
  dog_image_dataurl;
  uploadedImage;
  photoName = 'default';
  dogPicture: string;
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InformFoundPage');
  }
  addAnnounce() {
    this._DB.uploadImageDog(this.dogPicture).then((snapshot: any) => {
      this.photoName = this._DB.imageName;
      this.db.database.ref('/announceFound').push().set({
        founder: this.uid,
        breed: this.breed,
        contactMiss: this.infoFound.value.contactMiss,
        dogDetail: this.infoFound.value.dogDetail,
        dogWithYou: this.infoFound.value.dogWithYou,
        photoName: this.photoName
      }).then(() => { this.navCtrl.pop() })
    })


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
