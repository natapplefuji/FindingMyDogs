import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase/app'
import { BreedListPage } from '../breed-list/breed-list'
/**
 * Generated class for the FilterResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-result',
  templateUrl: 'filter-result.html',
})
export class FilterResultPage {
  breedResult = [];
  breedResultChild = [];
  num;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.breedResult = navParams.get('result');
    this.showBreedChild();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterResultPage');
  }

  showBreedChild() {
    this.breedResultChild = []; //reset counter เวลา filter ใหม่
    var ref = firebase.database().ref('announceAdopt/')
    for (let i = this.breedResult.length-1; i >=0;i--) //จาก 0 ไปมันกลับด้าน เลยลบลงมา
    ref.orderByChild('breed').equalTo(this.breedResult[i]).once("value").then((snapshot) => { //query child ที่ breed ตรงตามพันธุ์ค่อย getChildren
      console.log(this.breedResult[i]+' no. child '+snapshot.numChildren());
      this.num = snapshot.numChildren();
      this.breedResultChild.push(this.num);
    })
  }
  goToBreedListPage(breed) {
    this.navCtrl.push(BreedListPage, { breed: breed });
  }

}
