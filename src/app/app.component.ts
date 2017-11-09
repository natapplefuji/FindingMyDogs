import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { AdoptTabPage } from '../pages/adopt-tab/adopt-tab';
import { UserProfilePage } from '../pages/user-profile/user-profile'
import { MyAnnouncePage } from '../pages/my-announce/my-announce'
import { LostMainPage } from '../pages/lost-main/lost-main'
import { MyDogPage } from '../pages/my-dog/my-dog'
import { TabPage } from '../pages/tab/tab';
import firebase from 'firebase';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AuthProvider } from '../providers/auth/auth'

@Component({
  templateUrl: 'app.html'
})
  
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  
  rootPage: any;
  userInfo: any;

  constructor(public authProvider : AuthProvider,public userService:UserServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) { 
    this.initializeApp();

  }
  
  initializeApp() {
    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else { 
        this.userInfo = this.userService.getUserInfo(); //ไว้ตรงนี้เพราะถ้า initapp()แล้ว จะข้าม method ใน constructor เลย
        this.rootPage = TabPage;
        unsubscribe();
      }
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logoutUser() {
    this.authProvider.logoutUser();
    this.nav.setRoot(LoginPage);
    
  }

  goToPage(page) {
    if (page == 'goToProfile') {
      this.nav.push(UserProfilePage);
    } else if (page == 'goToMyDog') {
      this.nav.push(MyDogPage);
    }else if (page == 'goToAnnounce') {
      this.nav.push(MyAnnouncePage);
    }else if (page == 'goToAdopt') {
      this.nav.push(AdoptTabPage);
    }else if (page == 'goToLost') {
      this.nav.push(LostMainPage);
    }
  }
//ใช้ไปก่อน รอแก้บัค push จาก component.ts ค่อยรวบ fn()

}
