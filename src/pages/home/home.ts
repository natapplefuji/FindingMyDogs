import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { LoginPage} from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { LostAnnouncePage } from '../lost-announce/lost-announce';
import { UserServiceProvider } from '../../providers/user-service/user-service'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
 
export class HomePage {
  test: any;
  constructor(public authProvider: AuthProvider, public navCtrl: NavController, public userService: UserServiceProvider) {
    this.test = userService.getUserInfo();
  }
  lostTapped() { 
    this.navCtrl.push(LostMainPage);
  }
  adoptTapped() { 
    this.navCtrl.push(AdoptGetPage);
  }
  logout(){
    this.authProvider.logoutUser();
    this.navCtrl.push(LoginPage);
  }
  lostAnnounce() { 
    this.navCtrl.push(LostAnnouncePage);
  }
  adoptMore() { 
    this.navCtrl.push(AdoptGetPage);
  }
}
