import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image'
import { DatabaseProvider } from '../../providers/database/database'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { BreedProvider} from '../../providers/breed/breed'
/**
 * Generated class for the AdoptGivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-give',
  templateUrl: 'adopt-give.html',
})
export class AdoptGivePage {

  private infoAdopt: FormGroup;
  announceAdopt: FirebaseListObservable<any>;
  uid;
  breed;
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
    private camera: Camera,
    private _breed :BreedProvider) {
    this.announceAdopt = af.list('/announceAdopt');
    this.uid = userService.uid;
    this.breed = _breed.breeds;
    this.infoAdopt = this.formBuilder.group({
      dogName: ['', Validators.required],
      age: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      contactMiss:['', Validators.required],
      dogDetail: ['', Validators.required],
      reason: ['', Validators.required],
    })
    this.milliTime = this.date.getTime();
    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
  }
  
  addAnnounceAdopt() {
    if (this.uploadedImage == null) {
      this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
        .then((snapshot: any) => {
          this.uploadedImage = snapshot.downloadURL;
          this.photoName = this._DB.imageName;
          this.db.database.ref('/announceAdopt').push().set({
            uid: this.uid,
            dogName: this.infoAdopt.value.dogName,
            breed: this.infoAdopt.value.breed,
            gender: this.infoAdopt.value.gender,
            age: this.infoAdopt.value.age,
            contactMiss: this.infoAdopt.value.contactMiss,
            dogDetail: this.infoAdopt.value.dogDetail,
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

  cancelForm() { 
    this.navCtrl.pop();
  }

}
