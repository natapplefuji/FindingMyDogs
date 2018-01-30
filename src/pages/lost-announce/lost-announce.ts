import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database-deprecated'
/**
 * Generated class for the LostAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost-announce',
  templateUrl: 'lost-announce.html',
})
export class LostAnnouncePage {
  location: string;
  announcelistAll:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private db: AngularFireDatabase) {
    this.location = "nearby";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostAnnouncePage');
  }
  getAnnouceAll() { 
    console.log("baba")
    this.announcelistAll = this.db.list('announceMissing/');
    console.log(this.announcelistAll)
  }
}
