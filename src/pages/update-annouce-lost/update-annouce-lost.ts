import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BreedProvider } from '../../providers/breed/breed';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the UpdateAnnouceLostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-annouce-lost',
  templateUrl: 'update-annouce-lost.html',
})
export class UpdateAnnouceLostPage {
  private announcelost: FormGroup;
  breed
  // dogPicture = this.navParams.get('email');
  constructor(public navCtrl: NavController, public navParams: NavParams, private _breed: BreedProvider, public viewCtrl: ViewController,private formBuilder: FormBuilder,private db: AngularFireDatabase,private toastCtrl: ToastController) {
    this.announcelost = this.formBuilder.group({
      dogName: [navParams.get("dogName"), Validators.required],
      breed: [navParams.get("breed"), Validators.required],
      gender: [navParams.get("gender"), Validators.required],
      age_year: [navParams.get("ageyear"), Validators.required],
      age_month: [navParams.get("agemonth"), Validators.required],
      age_week: [navParams.get("ageweek"), Validators.required],
      contactMiss: [navParams.get("contactMiss")],
      dogDetail: [navParams.get("dogDetail")],
      reward: [navParams.get("reward")],
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
  editAnnounceLost() { 
    this.db.database.ref('/announceMissing/' + this.navParams.get("key")).update({
      
      dogName: this.announcelost.value.dogName,
      breed: this.announcelost.value.breed,
      gender: this.announcelost.value.gender,
      age_year: this.announcelost.value.age_year,
      age_month: this.announcelost.value.age_month,
      age_week: this.announcelost.value.age_week,
      contactMiss: this.announcelost.value.contactMiss,
      dogDetail: this.announcelost.value.dogDetail,
      reward: this.announcelost.value.reward,
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
