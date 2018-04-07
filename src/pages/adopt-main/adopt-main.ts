import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { AdoptGetPage } from '../adopt-get/adopt-get';
import { AdoptGivePage } from '../adopt-give/adopt-give';
import { FilterModalPage } from '../filter-modal/filter-modal'
import { FilterResultPage } from '../filter-result/filter-result'
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image'
import { DatabaseProvider } from '../../providers/database/database'
import { PredictProvider } from '../../providers/predict/predict';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AdoptDetailPage } from '../adopt-detail/adopt-detail'
import firebase from 'firebase/app'
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { MyDogPage } from '../my-dog/my-dog';

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
  //for filtering
  RawCondition;
  dogPicture: string;
  filterCondition = [];
  breedResult = [];

  //for prediction
  photoName = "";
  dogBreedfromPredict = [];
  announcelist: FirebaseListObservable<any>;

  uid;
  breed = { //test var
    "chihuahua": {
      "areaRequire": "1",
      "coldResist": "1",
      "exercise": "2",
      "hairLength": "1",
      "heatResist": "2",
      "kidFriendly": "2",
      "size": "1"
    },
    "pomeranian": {
      "areaRequire": "1",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "3",
      "heatResist": "1",
      "kidFriendly": "2",
      "size": "1"
    },
    "shih tzu": {
      "areaRequire": "2",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "3",
      "heatResist": "1",
      "kidFriendly": "1",
      "size": "1"
    },
    "yorkshire terrier": {
      "areaRequire": "1",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "3",
      "heatResist": "1",
      "kidFriendly": "2",
      "size": "1"
    },
    "beagle": {
      "areaRequire": "3",
      "coldResist": "1",
      "exercise": "2",
      "hairLength": "1",
      "heatResist": "2",
      "kidFriendly": "3",
      "size": "1"
    },
    "pug": {
      "areaRequire": "1",
      "coldResist": "2",
      "exercise": "1",
      "hairLength": "1",
      "heatResist": "1",
      "kidFriendly": "2",
      "size": "1"
    },
    "english bulldog": {
      "areaRequire": "1",
      "coldResist": "1",
      "exercise": "3",
      "hairLength": "1",
      "heatResist": "1",
      "kidFriendly": "3",
      "size": "2"
    },
    "french bulldog": {
      "areaRequire": "2",
      "coldResist": "2",
      "exercise": "2",
      "hairLength": "1",
      "heatResist": "1",
      "kidFriendly": "2",
      "size": "1"
    },
    "siberian husky": {
      "areaRequire": "3",
      "coldResist": "3",
      "exercise": "2",
      "hairLength": "2",
      "heatResist": "2",
      "kidFriendly": "2",
      "size": "2"
    },
    "golden retriever": {
      "areaRequire": "3",
      "coldResist": "3",
      "exercise": "3",
      "hairLength": "2",
      "heatResist": "2",
      "kidFriendly": "3",
      "size": "3"
    },
    "labrador retriever": {
      "areaRequire": "3",
      "coldResist": "3",
      "exercise": "2",
      "hairLength": "1",
      "heatResist": "2",
      "kidFriendly": "3",
      "size": "3"
    },

  }

  constructor(
    private alertCtrl: AlertController,
    private userService: UserServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private image: ImageProvider,
    private _DB: DatabaseProvider,
    public _predict: PredictProvider,
    public loadingCtrl: LoadingController,
    private db: AngularFireDatabase
  ) {
    this.announcelist = this.db.list('announceAdopt/', {
      query: {
        orderByChild: 'status',
        equalTo: 'wait',
        limitToLast: 6
      }
    }
    ).map((arr) => {
      var array = <any>{};
      array = arr;
      return array.reverse();
    }) as FirebaseListObservable<any[]>;
  }
  //ฟังก์ชันเรียกหาชื่อพันธุ์ this.a = this.filterBreed(this.breed, "areaRequire", "high", "coldResist", "high", "hairLength", "medium", "heatResist", "medium", "size", "big")
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptMainPage');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'โปรดเลือกแหล่งที่มา',
      buttons: [
        {
          text: 'คลังรูปภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((data) => {
              this.dogPicture = data;
              this.imagePrep();
            });

          }
        },
        {
          text: 'กล้องถ่ายภาพ',
          handler: () => {
            this.image.getDogPicture(this.camera.PictureSourceType.CAMERA).then((data) => {
              this.dogPicture = data;
              this.imagePrep();
            });
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  getImage() {

    this.presentActionSheet();
  }
  imagePrep() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Please Wait...'
    });
    this._DB.uploadImageDog(this.dogPicture).then(() => {
      this.photoName = this._DB.imageName;
      loading.present().then(() => {
        this._predict.getJsonData(this.photoName).subscribe((data) => {
          if (data[0].score > 50) {
            this.dogBreedfromPredict = [];
            this.dogBreedfromPredict.push(data[0].dogName);
            this.dogBreedfromPredict.push(data[1].dogName);
            this.dogBreedfromPredict.push(data[2].dogName);
            this.dogBreedfromPredict.push(data[3].dogName);
          }
          loading.dismiss();

          if (this.dogBreedfromPredict.length > 0) {
            this.navCtrl.push(FilterResultPage, { result: this.dogBreedfromPredict })
          } else {
            let toast = this.toastCtrl.create({
              message: 'ขออภัย ไม่สามารถตรวจสอบพันธุ์ได้ กรุณาลองรูปภาพอื่น',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        })
      })
    })
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
          this.navCtrl.push(FilterResultPage, { result: this.breedResult })
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
    var numChild;
    var ref = firebase.database().ref('dogs/')
    this.uid = this.userService.uid;
    ref.orderByChild('uid').equalTo(this.uid).on('value', ((data) => {
      numChild = data.numChildren();
      if (numChild == 0) {
        this.navCtrl.push(AdoptGivePage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'คุณมีสุนัขเพิ่มไว้ในระบบ',
          message: 'ต้องการสร้างประกาศจากข้อมูลสุนัขที่มีหรือไม่?',
          buttons: [
            {
              text: 'ไม่',
              role: 'cancel',
              handler: () => {
                this.navCtrl.push(AdoptGivePage);
              }
            },
            {
              text: 'ใช่',
              handler: () => {
                this.navCtrl.push(MyDogPage);
              }
            }
          ]
        });
        alert.present();
      }
    }))
  }
  goToAnnouceDetail(dogName, breed, gender, age, dogDetail, photo, contactMiss, reward, uid) {
    this.navCtrl.push(AdoptDetailPage, {
      dogName: dogName,
      breed: breed,
      gender: gender,
      age: age,
      dogDetail: dogDetail,
      photo: photo,
      contactMiss: contactMiss,
      reward: reward,
      uid: uid
    })
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

