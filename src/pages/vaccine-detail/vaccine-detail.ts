import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VaccineDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vaccine-detail',
  templateUrl: 'vaccine-detail.html',
})
export class VaccineDetailPage {
  vaccine;
  time;
  dogObject;
  day; month; year;
  monthRaw;
  vaccineName;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vaccine = navParams.get('vaccine');
    this.time = navParams.get('time');
    this.dogObject = navParams.get('dogObject');
    var date = new Date(this.time);
    this.day = date.getDay();
    this.monthRaw = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.getVaccineNameAndMonth(this.vaccine, this.monthRaw);
  }

  getVaccineNameAndMonth(vaccine, monthRaw) {
    switch (vaccine) {
      case 'week3': this.vaccineName = 'วัคซีนป้องกันโรคหวัด และหลอดลมอักเสบติดต่อ'; break;
      case 'week4': this.vaccineName = 'ตรวจสุขภาพและถ่ายพยาธิ'; break;
      default: 'default';
    }
    switch (monthRaw) {
      case 1: this.month = "มกราคม";
        break;
      case 2: this.month = "กุมภาพันธ์";
        break;
      case 3: this.month = "มีนาคม";
        break;
      case 4: this.month = "เมษายน";
        break;
      case 5: this.month = "พฤษภาคม";
        break;
      case 6: this.month = "มิถุนายน";
        break;
      case 7: this.month = "กรกฎาคม";
        break;
      case 8: this.month = "สิงหาคม";
        break;
      case 9: this.month = "กันยายน";
        break;
      case 10: this.month = "ตุลาคม";
        break;
      case 11: this.month = "พฤศจิกายน";
        break;
      case 12: this.month = "ธันวาคม";
        break;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VaccineDetailPage');
  }

}
