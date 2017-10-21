import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
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
  
  email: string = '';
  password: string = '';
  displayName: string = '';
  firstName: string = '';
  lastName: string = '';
  photo: any;
  tel: string = '';
  loading: Loading;

  isenabled:boolean;
  constructor(public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    /*if(this.email !== '' && this.password !== ''&& this.displayName !== ''&& this.firstName !== ''&& this.lastName !== ''&& this.tel !== ''){
      //enable the button
      this.isenabled=true; 
      }else{
      //disable the button
      this.isenabled=false;
      }*/
  }

  SignUp() {
    this.authProvider.signupUser(this.email, this.password,this.displayName,this.firstName,this.lastName,this.tel)
    .then(() => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(LoginPage);
      });
    }, (error) => {
      this.loading.dismiss().then( () => {
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
  
  
}
