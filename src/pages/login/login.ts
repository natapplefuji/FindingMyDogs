import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'


import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  displayName: string = '';
  firstName: string = '';
  lastName: string = '';
  photo: any;
  tel: string = '';

  loading: Loading;
  constructor(public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.authProvider.loginUser(this.email,
      this.password)
      .then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.push(HomePage);
        });
      }, error => {
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
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
    
  }
  
}
