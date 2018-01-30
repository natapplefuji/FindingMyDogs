import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { DatabaseProvider } from '../../providers/database/database'
import { MyDogPage } from '../my-dog/my-dog'
import { BreedProvider } from '../../providers/breed/breed';
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
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
  breed;
  constructor(private _breed :BreedProvider,private loadingCtrl: LoadingController,private camera: Camera, public actionSheetCtrl: ActionSheetController, private _DB: DatabaseProvider, private db: AngularFireDatabase, private userService: UserServiceProvider, private image: ImageProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = userService.uid;
    this.breed = _breed.breeds;
    this.dog = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      detail: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMyDogPage');
  }
  addDog() {
    if (this.uploadedImage == null) {
      this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
      .then((snapshot: any) => {
        this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
        console.log(snapshot.downloadURL)
        this.photoName = this._DB.imageName; 
        this.db.database.ref('/dogs').push().set({
          uid: this.uid,
          dogName: this.dog.value.dogName,
          breed: this.dog.value.breed,
          gender: this.dog.value.gender,
          age: this.dog.value.age,
          detail: this.dog.value.detail,
          photo: this.uploadedImage,
          photoName: this.photoName,
          status: 'ปลอดภัย'
        }).then(() => { this.navCtrl.pop() })
        }) 
    }
    // if (this.uploadedImage == null) {
    //   this.uploadedImage = 'assets/img/dog_test.jpeg';
    // }
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
    console.log("get"+this.dogPicture)
    // this._DB.uploadImageDog(this.dogPicture) //อัพขึ้นไปบน storage ได้ downloadURL
    //   .then((snapshot: any) => {
    //     this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
    //     console.log(snapshot.downloadURL)
    //     this.photoName = this._DB.imageName;  
    //   })  
    //   console.log(this.uploadedImage)
  }
}
