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
      case 'weekunder3': this.vaccineName = 'วัคซีนป้องกันโรคหวัด และหลอดลมอักเสบติดต่อ'; break;
      case 'week3': this.vaccineName = 'ตรวจสุขภาพและถ่ายพยาธิ'; break;
      case 'week4': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข ลำไส้อักเสบ ตับอักเสบ เสปโตสไปโรซิส และโรคหวัดและหลอดลมอักเสบ ติดต่อ ครั้งที่ 1'; break;
      case 'week6': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข ลำไส้อักเสบ ตับอักเสบ เสปโตสไปโรซิส และโรคหวัดและหลอดลมอักเสบ ติดต่อ ครั้งที่ 2'; break;
      case 'week8': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข ลำไส้อักเสบ ตับอักเสบ เสปโตสไปโรซิส และโรคหวัดและหลอดลมอักเสบ ติดต่อ ครั้งที่ 3 วัคซีนป้องกันโรคพิษสุนัขบ้า ครั้งที่ 1'; break;
      case 'week12': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข และลำไส้อักเสบ'; break;
      case 'week16': this.vaccineName = 'วัคซีนป้องกันโรคพิษสุนัขบ้า ครั้งที่ 2'; break; //6เดือน
      case 'week26': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข ลำไส้อักเสบ ตับอักเสบ เสปโตสไปโรซิส โรคหวัดและหลอดลมอักเสบ พิษสุนัขบ้า(ทุกๆ 1 ปี)'; break; // 1ปี
      case 'week52': this.vaccineName = 'วัคซีนป้องกันโรคไข้หัดสุนัข ลำไส้อักเสบ ตับอักเสบ เสปโตสไปโรซิส โรคหวัดและหลอดลมอักเสบ พิษสุนัขบ้า(ทุกๆ 1 ปี)'; break; //เกิน 1ปี ฉีดเหมือน 1 ปี
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
