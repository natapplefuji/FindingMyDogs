import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController  } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ImageProvider } from '../../providers/image/image'
import { DatabaseProvider } from '../../providers/database/database'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
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
  private annoucelost: FormGroup;
  uid: '';
  dog_image_dataurl: string;
  uploadedImage: any = null;

  constructor(private loadingCtrl: LoadingController, private _DB: DatabaseProvider, private db: AngularFireDatabase, private userService: UserServiceProvider, private image: ImageProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = userService.uid;
    this.annoucelost = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      contactMiss: [''],
      dogDetail: [''],
      reward: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMyDogPage');
  }
  addAnnounceLost() {
    if (this.uploadedImage == null) {
      this.uploadedImage = '../../assets/img/dog_test.jpeg';
    }
    this.db.database.ref('/announceMissing').push().set({
      uid: this.uid,
      dogName: this.annoucelost.value.dogName,
      breed: this.annoucelost.value.breed,
      gender: this.annoucelost.value.gender,
      age: this.annoucelost.value.age,
      contactMiss: this.annoucelost.value.contactMiss,
      dogDetail: this.annoucelost.value.dogDetail,
      reward: this.annoucelost.value.reward,
      photo: this.uploadedImage,
    }).then(() => { this.navCtrl.pop() })
  }
  getImage() {

    this.dog_image_dataurl = this.image.presentActionSheet(); //ได้ภาพ base64

    this._DB.uploadImageDog(this.dog_image_dataurl) //อัพขึ้นไปบน storage ได้ downloadURL
      .then((snapshot: any) => {
        console.dir(snapshot)
        this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
        console.log(this.uploadedImage)
      })
  }
  // infoLost = {
  //   dogName: '',
  //   dogAge: '',
  //   breed:'',
  //   contactMiss: '',
  //   dogDetail: '',
  //   dogImage: '',
  //   reward: '',
  //   status: 'lost'
  // }
  // announceMissing: FirebaseListObservable<any>;

  // constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
  //   this.announceMissing = af.list('/announceMissing');
  // }
  // infoForm() { 
  //   console.dir(this.infoLost);
  //   if (this.infoLost.dogImage) {
  //     this.uploadImg(this.infoLost.dogImage);     
  //   }
  //   else { 
  //     alert("please select image");
  //   }
  // }
  // isSelected(e) { 
  //   console.log(e);
  //   let dogImage:any = e.target.files[0];
  //   let reader = new FileReader();
  //   reader.onload = (e:any) => { 
  //     this.infoLost.dogImage = e.target.result;
      
  //   }
  //   reader.readAsDataURL(dogImage);
  // }
  // uploadImg(img64) { 
  //   // this.announceMissing.push({
  //   //   dogName: this.infoLost.dogName,
  //   //   dogAge: this.infoLost.dogAge,
  //   //   breed:'',
  //   //   contactMiss: this.infoLost.contactMiss,
  //   //   dogDetail: this.infoLost.dogDetail,
  //   //   dogImage: img64,
  //   //   reward: this.infoLost.reward,
  //   //   status: 'lost'
  //   // }).then((data) => { 
  //   //   alert("upload success");
  //   // })
  // }
  // cancelForm() { 
  //   this.navCtrl.push(LostMainPage)
  // }
}
