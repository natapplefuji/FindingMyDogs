import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FoundAnnounceDetailPage } from '../found-announce-detail/found-announce-detail';
/**
 * Generated class for the FoundAnnouncePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found-announce',
  templateUrl: 'found-announce.html',
})
export class FoundAnnouncePage {
  
  foundAnnounce : FirebaseListObservable<any>;
  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.foundAnnounce = this.db.list('announceMissing/', {
      query: {
        orderByChild: 'status',
        equalTo: 'found'
      }
    })
  }
  goToFoundAnnounceDetail() {
    this.navCtrl.push(FoundAnnounceDetailPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundAnnouncePage');
  }

}
