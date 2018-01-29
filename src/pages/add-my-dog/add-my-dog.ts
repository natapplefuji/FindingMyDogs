import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { DatabaseProvider } from '../../providers/database/database'
import { MyDogPage } from '../my-dog/my-dog'
import { BreedProvider } from '../../providers/breed/breed';
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
  dog_image_dataurl: string;
  uploadedImage: any = null;
  photoName: string;
  breed;
  constructor(private loadingCtrl: LoadingController,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
    private _breed : BreedProvider,
    private userService: UserServiceProvider,
    private image: ImageProvider,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {
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
      this.uploadedImage = '../../assets/img/dog_test.jpeg';
    }
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
  }
  getImage() {

    this.dog_image_dataurl = this.image.presentActionSheet(); //ได้ภาพ base64

    this._DB.uploadImageDog(this.dog_image_dataurl) //อัพขึ้นไปบน storage ได้ downloadURL
      .then((snapshot: any) => {
        this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
        this.photoName = this._DB.imageName;
      })
  }
}
