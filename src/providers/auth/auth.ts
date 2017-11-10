import { Injectable } from '@angular/core';
import firebase from "firebase";
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user: any;
  constructor() {
    console.log('Hello AuthProvider Provider');
  }
  signupUser(email: string, password: string, displayName: string, firstName: string, lastName: string, tel: string,photo): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password, )
      .then(newUser => {
        firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set({
            email: email,
            displayName: displayName,
            firstName: firstName,
            lastName: lastName,
            tel: tel,
            photo: photo,
            provider: 'email'
          });
      });
  }
  getCurrentUser() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      return this.user.email;
    } else {
      return 'null';
    }
  }
  loginUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  logoutUser() {
    return firebase.auth().signOut();
  }
}
