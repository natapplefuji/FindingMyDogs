import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LostMainPage} from '../lost-main/lost-main';
import {LostInformThankPage} from '../lost-inform-thank/lost-inform-thank';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database'
import { ImageProvider } from '../../providers/image/image'
import { UserServiceProvider } from '../../providers/user-service/user-service'
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
  breed;
  dog_image_dataurl;
  uploadedImage;
  photoName;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    private formBuilder: FormBuilder,
    private image: ImageProvider,
    private userService: UserServiceProvider,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
  ) {
    this.announceFound = af.list('/announceMissing');
    this.uid = userService.uid;
    this.infoFound = this.formBuilder.group({
      founder: ['', Validators.required],
      breed: ['', Validators.required],
      contactMiss: ['', Validators.required],
      dogDetail: ['', Validators.required],
      dogWithYou: ['', Validators.required]    
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InformFoundPage');
  }
  addAnnouce() {
    this.db.database.ref('/announceFound').push().set({
      founder : this.uid,
      breed: this.breed,
      contactMiss : this.infoFound.value.contactMiss,
      dogDetail: this.infoFound.value.dogDetail,
      dogWithYou: this.infoFound.value.dogWithYou,
      photoName: this.photoName
    })
  
  }

  getImage() {
    
        this.dog_image_dataurl = this.image.presentActionSheet(); //ได้ภาพ base64
    
        this._DB.uploadImageDog(this.dog_image_dataurl) //อัพขึ้นไปบน storage ได้ downloadURL
          .then((snapshot: any) => {
            this.uploadedImage = snapshot.downloadURL; //เอา downloadURL มาแสดง
            this.photoName = this._DB.imageName;
          })
      }

  cancelForm() { 
    this.navCtrl.pop();
  }

  

}
