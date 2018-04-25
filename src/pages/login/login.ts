import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Platform,Events } from 'ionic-angular';
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { TabPage } from '../tab/tab'
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { UserServiceProvider } from '../../providers/user-service/user-service';

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
  email: string;
  password: string;
  user = {
    uid: '',
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    photo: '',
    tel: ''

  };
  playerID;
  loading: Loading;
  constructor(public authProvider: AuthProvider,
    private platform: Platform,
    public afAuth: AngularFireAuth,
    public facebook: Facebook,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.authProvider.loginUser(this.email,
      this.password)
      .then(authData => {
        this.loading.dismiss().then(() => {
          window["plugins"].OneSignal.getIds((ids => {
            this.playerID = ids.userId;
            firebase.database().ref('userProfile/').child(this.userService.uid).update({ playerID: this.playerID });
          })
          )
          this.events.publish('user:login'); //ไปเรียก f() ใน app.components.ts ให้อัพเดต userInfo
          this.navCtrl.setRoot(TabPage);
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
  loginWithFB() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    if (this.platform.is('cordova') || this.platform.is('android')) {  
      console.log("facebook cordova 1");
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential)
          .then(res => {
            var uid = firebase.auth().currentUser.uid; //uid จาก firebase authen
            this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(360).height(360).as(picture_large)', []).then((profile) => {
              this.user.email = profile['email'];
              this.user.uid = uid;
              this.user.displayName = profile['name'];
              this.user.lastName = profile['last_name'];
              this.user.firstName = profile['first_name'];
              this.user.photo = profile['picture_large']['data']['url'];
              firebase
              .database()
              .ref('/userProfile')
              .child(this.user.uid)
              .set({
                email: this.user.email,
                displayName: this.user.displayName,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                tel: this.user.tel,
                photo: this.user.photo,
                provider: 'facebook'
                });
                this.events.publish('user:login');
            })
            this.loading.dismiss().then(() => {
              this.navCtrl.setRoot(TabPage);
            })
            
          })

      })
    }
    else {
      console.log("facebook else 2")
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.user.email = res.additionalUserInfo.profile.email;
          this.user.uid = res.user.uid;
          this.user.displayName = res.additionalUserInfo.profile.name;
          this.user.lastName = res.additionalUserInfo.profile.last_name;
          this.user.firstName = res.additionalUserInfo.profile.first_name;
          this.user.photo = res.additionalUserInfo.profile.picture.data.url;
          if (res.user.phoneNumber) {
            this.user.tel = res.user.phoneNumber;
          }
  
          firebase
          .database()
          .ref('/userProfile')
          .child(this.user.uid)
          .set({
            email: this.user.email,
            displayName: this.user.displayName,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            tel: this.user.tel,
            photo: this.user.photo,
            provider: 'facebook'
            });
            this.events.publish('user:login');
          this.navCtrl.setRoot(TabPage);
        });
    }

    /*this.afAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => {
        console.log(res);
        this.user.email = res.additionalUserInfo.profile.email;
        this.user.uid = res.user.uid;
        this.user.displayName = res.additionalUserInfo.profile.name;
        this.user.lastName = res.additionalUserInfo.profile.last_name;
        this.user.firstName = res.additionalUserInfo.profile.first_name;
        this.user.photo = res.additionalUserInfo.profile.picture.data.url;
        if (res.user.phoneNumber) {
          this.user.tel = res.user.phoneNumber;
        }

        firebase
        .database()
        .ref('/userProfile')
        .child(this.user.uid)
        .set({
          email: this.user.email,
          displayName: this.user.displayName,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          tel: this.user.tel,
          photo: this.user.photo,
          provider: 'facebook'
        });
        this.navCtrl.setRoot(HomePage);
      });*/

    /*this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      let credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then(() => {
        this.navCtrl.setRoot(HomePage);
        this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(360).height(360).as(picture_large)', []).then((profile) => {
          this.user.email = profile['email'];
          this.user.uid = response.authResponse.userID;
          this.user.displayName = profile['name'];
          this.user.lastName = profile['last_name'];
          this.user.firstName = profile['first_name'];
          this.user.photo = profile['picture_large']['data']['url'];

        })
      })

    })*/
    /*let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        alert(JSON.stringify(result));
      }).catch((error) => {
        alert(JSON.stringify(error));
      })
    })*/


  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);

  }

}
