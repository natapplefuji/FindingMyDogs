import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { LostInformThankPage } from '../lost-inform-thank/lost-inform-thank';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database'
import { ImageProvider } from '../../providers/image/image'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { LocationProvider } from '../../providers/location/location'
import { Geocoder, GeocoderRequest } from '@ionic-native/google-maps';

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
  uid;
  breed = 'default'
  uploadedImage = null;
  photoName = 'default';
  dogPicture: string;
  date = new Date();
  day;
  month;
  year;
  milliTime;
  district
  province
  country
  loc = { lat: 0, lng: 0 };
  constructor(public navCtrl: NavController,
    public platform : Platform,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private image: ImageProvider,
    private userService: UserServiceProvider,
    private _DB: DatabaseProvider,
    private db: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public _loc : LocationProvider
  ) {

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
    this.platform.ready().then(() => {
      _loc.getLocation().then(data => {
        this.loc.lat = data.coords.latitude;
        this.loc.lng = data.coords.longitude;
        this.getGeoRequest()
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InformFoundPage');
  }
  addAnnounce() {
    if (this.uploadedImage == null) {
      //this.loc = this._loc.getLocation();
        
      this._DB.uploadImageDog(this.dogPicture).then((snapshot: any) => {
        this.uploadedImage = snapshot.downloadURL;
        this.photoName = this._DB.imageName;
        var myRef = this.db.database.ref('/announceFound').push()
        var key = myRef.key
        this.db.database.ref('/announceFound/'+key).set({
          founder: this.uid,
          announcefoundid:key,
          breed: this.breed,
          contactMiss: this.infoFound.value.contactMiss,
          dogDetail: this.infoFound.value.dogDetail,
          dogWithYou: this.infoFound.value.dogWithYou,
          photo: this.uploadedImage,
          photoName: this.photoName,
          day: this.day,
          month: this.month,
          year: this.year,
          millisec: this.milliTime,
          lat: this.loc.lat,
          lng: this.loc.lng

        }).then(() => {
          this.navCtrl.push(LostInformThankPage, { photo: this.photoName,announceFoundId:key})
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
  getImage() {

    this.presentActionSheet();
  }

  cancelForm() {
    this.navCtrl.pop();
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
