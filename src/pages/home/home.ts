import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LostMainPage } from '../lost-main/lost-main';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { LoginPage} from '../login/login'

import { AuthProvider} from '../../providers/auth/auth'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public authProvider:AuthProvider,public navCtrl: NavController) {

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
}
