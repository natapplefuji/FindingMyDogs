import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular'
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase'
import 'rxjs/add/operator/map';
/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {
  fbRef: any;
  image: string;
  constructor(private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    console.log('Hello ImageProvider Provider');
  }
  // presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'โปรดเลือกแหล่งที่มา',
  //     buttons: [
  //       {
  //         text: 'คลังรูปภาพ',
  //         handler: () => {
  //           this.getDogPicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((data) => {
  //             this.image = data;
  //             //console.log("handler"+ this.image)
  //           });
            
  //         }
  //       },
  //       {
  //         text: 'กล้องถ่ายภาพ',
  //         handler: () => {
  //           this.getDogPicture(this.camera.PictureSourceType.CAMERA).then((data) => {
  //             this.image = data;
  //             //console.log("handler"+ this.image)
  //           });
  //         }
  //       },
  //       {
  //         text: 'ยกเลิก',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  //   console.log("action"+ this.image)
  //   return this.image;
  // }

  getDogPicture(sourceType: any): Promise<any> {
    return new Promise(resolve => {
      let options = {
        sourceType: sourceType,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
        targetHeight: 500,
        allowEdit: true
      };
      this.camera.getPicture(options).then(data => {
        this.image = "data:image/jpeg;base64," + data;
        resolve(this.image);
      });
    });
  }
  /*upload(blob:Blob) {
    var fileName = 'sample-' + new Date().getTime() + '.png';
    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);
  
      var uploadTask = fileRef.put(blob);
  
      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });

  }*/
}
