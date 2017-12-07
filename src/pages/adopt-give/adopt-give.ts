import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AdoptMainPage} from '../adopt-main/adopt-main';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
/**
 * Generated class for the AdoptGivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt-give',
  templateUrl: 'adopt-give.html',
})
export class AdoptGivePage {

  infoLost = {
    dogName: '',
    dogAge: '',
    breed:'',
    contactMiss: '',
    dogDetail: '',
    dogImage: '',
    reward: '',
    status: 'lost'
  }
  announceMissing: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    this.announceMissing = af.list('/announceMissing');
  }
  infoForm() { 
    console.dir(this.infoLost);
    if (this.infoLost.dogImage) {
      this.uploadImg(this.infoLost.dogImage); 
      
    }
    else { 
      alert("please select image");
    }
  }
  isSelected(e) { 
    console.log(e);
    let dogImage:any = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e:any) => { 
      this.infoLost.dogImage = e.target.result;
      
    }
    reader.readAsDataURL(dogImage);
  }
  uploadImg(img64) { 
    // this.announceMissing.push({
    //   dogName: this.infoLost.dogName,
    //   dogAge: this.infoLost.dogAge,
    //   breed:'',
    //   contactMiss: this.infoLost.contactMiss,
    //   dogDetail: this.infoLost.dogDetail,
    //   dogImage: img64,
    //   reward: this.infoLost.reward,
    //   status: 'lost'
    // }).then((data) => { 
    //   alert("upload success");
    // })
  }
  cancelForm() { 
    this.navCtrl.push(AdoptMainPage)
  }

}
