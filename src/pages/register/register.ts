import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database'
import { ImageProvider} from '../../providers/image/image'
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController,ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { LoginPage } from '../login/login'


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {
    email: '',
    password: '',
    displayName: '',
    firstName: '',
    lastName: '',
    photo: null,
    tel: '',
    playerID:''

  };
  profile_image_dataurl: string;
  profileImage: string;
  loading: Loading;

  constructor(public authProvider: AuthProvider,
    private image: ImageProvider,
    private camera: Camera,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private _DB:DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    window["plugins"].OneSignal.getIds((ids => {
      this.user.playerID = ids.userId;
      })   
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  SignUp() {
    if (this.user.photo == null) {
      this.user.photo = 'assets/img/avatar.png'
    }
    this.authProvider.signupUser(this.user.email, this.user.password, this.user.displayName, this.user.firstName, this.user.lastName, this.user.tel,this.user.photo,this.user.playerID)
      .then(() => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(LoginPage);
        });
      }, (error) => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.navCtrl.push(LoginPage);
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'โปรดเลือกแหล่งที่มา',
      buttons: [
        {
          text: 'คลังรูปภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((data) => {
              this.profileImage = data;
            });
            
          }
        },
        {
          text: 'กล้องถ่ายภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.CAMERA).then((data) => {
              this.profileImage = data;
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Upload successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  selectImage() { 
    this.presentActionSheet();
  }
  getImage() {
    this._DB.uploadImageProfile(this.profileImage)
    .then((snapshot: any) => {
      this.user.photo = snapshot.downloadURL;
      this.presentToast();
    })
  }


}
