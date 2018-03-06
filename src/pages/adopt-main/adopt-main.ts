import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,ToastController } from 'ionic-angular';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { AdoptGivePage } from '../adopt-give/adopt-give';
import { FilterModalPage } from '../filter-modal/filter-modal'
import { FilterResultPage } from '../filter-result/filter-result'
/**
 * Generated class for the AdoptMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-adopt-main',
  templateUrl: 'adopt-main.html',
})
export class AdoptMainPage {
  RawCondition;
  filterCondition = [];
  breed = { //test var
    "golden retriever": {
      "areaRequire": "3",
      "coldResist": "3",
      "exercise": "3",
      "hairLength": "2",
      "heatResist": "2",
      "kidFriendly": "3",
      "size": "3"
    },
    "basenji": {
      "areaRequire": "1",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "2",
      "heatResist": "2",
      "kidFriendly": "2",
      "size": "1"
    },
    "beagle": {
      "areaRequire": "1",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "2",
      "heatResist": "2",
      "kidFriendly": "2",
      "size": "1"
    }
  }
  breedResult = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,private toastCtrl :ToastController) {
    
  }
  //ฟังก์ชันเรียกหาชื่อพันธุ์ this.a = this.filterBreed(this.breed, "areaRequire", "high", "coldResist", "high", "hairLength", "medium", "heatResist", "medium", "size", "big")
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptMainPage');
  }

  openModal() {

    let filterModal = this.modalCtrl.create('FilterModalPage')
    filterModal.present();

    filterModal.onDidDismiss((data) => {
      if (data) {
        this.RawCondition = data;
        this.filterCondition = []; //เผื่อ search หลายรอบจะได้ reset condition ทุกครั้ง
        this.breedResult = []; //เหมือนข้างบน reset result
        for (var key in this.RawCondition) { //เอาเฉพาะ condition ที่ user เลือก filter (ที value ่ไม่เป็น 0)
          if (this.RawCondition.hasOwnProperty(key) && this.RawCondition[key] != 0) {
            this.filterCondition.push(key);
            this.filterCondition.push(this.RawCondition[key]);
          }
        }
        switch (this.filterCondition.length) {
          case 2: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1]); break;
          case 4: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3]); break;
          case 6: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3], this.filterCondition[4], this.filterCondition[5]); break;
          case 8: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3], this.filterCondition[4], this.filterCondition[5], this.filterCondition[6], this.filterCondition[7]); break;
          case 10: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3], this.filterCondition[4], this.filterCondition[5], this.filterCondition[6], this.filterCondition[7], this.filterCondition[8], this.filterCondition[9]); break;
          case 12: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3], this.filterCondition[4], this.filterCondition[5], this.filterCondition[6], this.filterCondition[7], this.filterCondition[8], this.filterCondition[9], this.filterCondition[10], this.filterCondition[11]); break;
          case 14: this.filterBreed(this.breed, this.filterCondition[0], this.filterCondition[1], this.filterCondition[2], this.filterCondition[3], this.filterCondition[4], this.filterCondition[5], this.filterCondition[6], this.filterCondition[7], this.filterCondition[8], this.filterCondition[9], this.filterCondition[10], this.filterCondition[11], this.filterCondition[12], this.filterCondition[13]); break;
        }
        if (this.breedResult.length == 0) {
          let toast = this.toastCtrl.create({
            message: 'ขออภัย ไม่พบพันธุ์ที่ท่านเลือก กรุณาลองอีกครั้งค่ะ',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        } else {
          this.navCtrl.push(FilterResultPage,{result:this.breedResult})
        }
        console.log(this.filterCondition);
        console.log(this.breedResult);
      }
    });

  }
  adoptMore() {
    this.navCtrl.push(AdoptGetPage);
  }
  addAdopt() {
    this.navCtrl.push(AdoptGivePage);
  }

  filterBreed(obj, key1, val1, //เงื่อนไขอย่างน้อย 1 อย่าง
    ...etc) { //rest parameter รับ parameter ไม่จำกัด
    let paraLength = etc.length;
    switch (paraLength) {
      case 0: if (!this.scan1(obj, key1, val1))
        return -1; //ไม่พบ
      else return this.scan1(obj, key1, val1);

      case 2: if (!this.scan2(obj, key1, val1, etc[0], etc[1]))
        return -1;
      else this.scan2(obj, key1, val1, etc[0], etc[1]);

      case 4: if (!this.scan3(obj, key1, val1, etc[0], etc[1], etc[2], etc[3]))
        return -1;
      else this.scan3(obj, key1, val1, etc[0], etc[1], etc[2], etc[3]);

      case 6: if (!this.scan4(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5]))
        return -1;
      else this.scan4(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5]);

      case 8: if (!this.scan5(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7]))
        return -1;
      else return this.scan5(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7]);

      case 10: if (!this.scan6(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7], etc[8], etc[9]))
        return -1;
      else return this.scan6(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7], etc[8], etc[9]);

      case 12: if (!this.scan7(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7], etc[8], etc[9], etc[10], etc[11]))
        return -1;
      else return this.scan7(obj, key1, val1, etc[0], etc[1], etc[2], etc[3], etc[4], etc[5], etc[6], etc[7], etc[8], etc[9], etc[10], etc[11]);

      default: return -1;
    }

  }
  scan1(obj, key1, val1) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan1(obj[i], key1, val1)
        if (found) {
          this.breedResult.push(i); //เงื่อนไขตรงก็เก็บพันธุ์
        }
      }
    }
    return null
  }
  scan2(obj, key1, val1, key2, val2) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan2(obj[i], key1, val1, key2, val2)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
  scan3(obj, key1, val1, key2, val2, key3, val3) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2 && obj[key3] === val3) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan3(obj[i], key1, val1, key2, val2, key3, val3)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
  scan4(obj, key1, val1, key2, val2, key3, val3, key4, val4) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2 && obj[key3] === val3 && obj[key4] === val4) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan4(obj[i], key1, val1, key2, val2, key3, val3, key4, val4)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
  scan5(obj, key1, val1, key2, val2, key3, val3, key4, val4, key5, val5) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2 && obj[key3] === val3 && obj[key4] === val4 && obj[key5] === val5) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan5(obj[i], key1, val1, key2, val2, key3, val3, key4, val4, key5, val5)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
  scan6(obj, key1, val1, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2 && obj[key3] === val3 && obj[key4] === val4 && obj[key5] === val5 && obj[key6] === val6) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan6(obj[i], key1, val1, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
  scan7(obj, key1, val1, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6, key7, val7) {
    if (!obj || (typeof obj === 'string')) {
      console.log("nooo")
      return null
    }
    if (obj[key1] === val1 && obj[key2] === val2 && obj[key3] === val3 && obj[key4] === val4 && obj[key5] === val5 && obj[key6] === val6 && obj[key7] === val7) {
      return obj
    }

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        var found = this.scan7(obj[i], key1, val1, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6, key7, val7)
        if (found) {
          this.breedResult.push(i);
        }
      }
    }
    return null
  }
}

