import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service'
import { AngularFireDatabase } from 'angularfire2/database-deprecated'
import { MyDogPage} from '../my-dog/my-dog'
/**
 * Generated class for the AddMyDogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-my-dog',
  templateUrl: 'add-my-dog.html',
})
export class AddMyDogPage {

  private dog: FormGroup;
  uid: '';

  constructor(private db: AngularFireDatabase, private userService: UserServiceProvider, private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.uid = userService.uid;
    this.dog = this.formBuilder.group({
      dogName: ['', Validators.required],
      breed: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      detail: ['-'],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMyDogPage');
  }
  addDog() {
    this.db.database.ref('/dogs').push().set({
      uid: this.uid,
      dogName: this.dog.value.dogName,
      breed: this.dog.value.breed,
      gender: this.dog.value.gender,
      age: this.dog.value.age,
      detail: this.dog.value.detail,
      photo:'../../assets/img/dog_test.jpeg',
      status: 'ปลอดภัย'
    }).then(() => {this.navCtrl.pop() })
  }

}
