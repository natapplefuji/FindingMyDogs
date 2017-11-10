import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database'
import { ImageProvider} from '../../providers/image/image'
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

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
    tel: ''

  };
  profile_image_dataurl: string;

  loading: Loading;

  constructor(public authProvider: AuthProvider,
    private image: ImageProvider,
    private _DB:DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  SignUp() {
    if (this.user.photo == null) {
      this.user.photo = '../../assets/img/avatar.png'
    }
    this.authProvider.signupUser(this.user.email, this.user.password, this.user.displayName, this.user.firstName, this.user.lastName, this.user.tel,this.user.photo)
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
  getImage() {
    this.profile_image_dataurl = this.image.presentActionSheet();
    this._DB.uploadImageProfile(this.profile_image_dataurl)
      .then((snapshot: any) => {
        this.user.photo = snapshot.downloadURL;
      })
  }


}
