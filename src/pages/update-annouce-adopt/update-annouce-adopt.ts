import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BreedProvider } from '../../providers/breed/breed';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the UpdateAnnouceAdoptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-annouce-adopt',
  templateUrl: 'update-annouce-adopt.html',
})
export class UpdateAnnouceAdoptPage {
  private announceadopt: FormGroup;
  breed

  constructor(public navCtrl: NavController, public navParams: NavParams, private _breed: BreedProvider, public viewCtrl: ViewController,private formBuilder: FormBuilder,private db: AngularFireDatabase,private toastCtrl: ToastController) {
    this.announceadopt = this.formBuilder.group({
      dogName: [navParams.get("dogName"), Validators.required],
      breed: [navParams.get("breed"), Validators.required],
      gender: [navParams.get("gender"), Validators.required],
      age: [navParams.get("age"), Validators.required],
      contactMiss: [navParams.get("contactMiss")],
      dogDetail: [navParams.get("dogDetail")],
    })
    
    this.breed = _breed.breeds;
    // this.announceDetail.dogName = navParams.get("dogName");
    // this.announceDetail.breed = navParams.get("breed");
    // this.announceDetail.gender = navParams.get("gender");
    // this.announceDetail.age = navParams.get("age");
    // this.announceDetail.dogDetail = navParams.get("dogDetail");
    // this.announceDetail.photo = navParams.get("photo");
    // this.announceDetail.contactMiss = navParams.get("contactMiss");
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad UpdateAnnouceLostPage');
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
  editAnnounceAdopt() { 
    this.db.database.ref('/announceAdopt/' + this.navParams.get("key")).update({
      dogName: this.announceadopt.value.dogName,
      breed: this.announceadopt.value.breed,
      gender: this.announceadopt.value.gender,
      age: this.announceadopt.value.age,
      contactMiss: this.announceadopt.value.contactMiss,
      dogDetail: this.announceadopt.value.dogDetail,
    }).then(() => {
      let toast = this.toastCtrl.create({
        message: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
        duration: 2000,
        position: 'top'
      });
    
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
    
      toast.present();
      this.viewCtrl.dismiss();
    })
  }

}