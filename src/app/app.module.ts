import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast'
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook'
import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps'
import { Geolocation } from '@ionic-native/geolocation'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register'
import { AdoptDetailPage } from '../pages/adopt-detail/adopt-detail';
import { AdoptMainPage } from '../pages/adopt-main/adopt-main';
import { AdoptGetPage } from '../pages/adopt-get/adopt-get';
import { AdoptGivePage } from '../pages/adopt-give/adopt-give';
import { AdoptTabPage } from '../pages/adopt-tab/adopt-tab';
import { LoginPage } from '../pages/login/login';
import { MyAnnouncePage } from '../pages/my-announce/my-announce'
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { LostAnnouncePage } from '../pages/lost-announce/lost-announce';
import { LostFindFailPage } from '../pages/lost-find-fail/lost-find-fail';
import { LostInformPage } from '../pages/lost-inform/lost-inform';
import { LostInformThankPage } from '../pages/lost-inform-thank/lost-inform-thank';
import { LostMainPage } from '../pages/lost-main/lost-main';
import { LostRelatedPage } from '../pages/lost-related/lost-related';
import { LostRelatedDetailPage } from '../pages/lost-related-detail/lost-related-detail';
import { LostStockFoundPage } from '../pages/lost-stock-found/lost-stock-found';
import { LostStockMissPage } from '../pages/lost-stock-miss/lost-stock-miss';
import { MyDogPage } from '../pages/my-dog/my-dog';
import { AddMyDogPage } from '../pages/add-my-dog/add-my-dog';
import { MyDogDetailPage } from '../pages/my-dog-detail/my-dog-detail';
import { TabPage } from '../pages/tab/tab';
import { TipPage } from '../pages/tip/tip';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ImageProvider } from '../providers/image/image';
import { DatabaseProvider } from '../providers/database/database';
import { InformFoundPage } from '../pages/inform-found/inform-found';
import { MyNotiPage } from '../pages/my-noti/my-noti';
import { MyNotiDetailPage } from '../pages/my-noti-detail/my-noti-detail';
import { BreedProvider } from '../providers/breed/breed';
import { PredictProvider } from '../providers/predict/predict';
import { LostAnnounceDetailPage } from '../pages/lost-announce-detail/lost-announce-detail'
import { LocationProvider } from '../providers/location/location';
import { FilterResultPage } from '../pages/filter-result/filter-result'
import { BreedListPage } from '../pages/breed-list/breed-list'
import { VaccineProvider } from '../providers/vaccine/vaccine';
import { VaccineDetailPage } from '../pages/vaccine-detail/vaccine-detail';
import { UpdateAnnouceLostPage } from '../pages/update-annouce-lost/update-annouce-lost';
import { UpdateAnnouceAdoptPage } from '../pages/update-annouce-adopt/update-annouce-adopt';
 
const config = {
  apiKey: "AIzaSyCXIcgmwlCjayssixzkG5xRZm2pZX6rUq0",
  authDomain: "findingmydogs-kmitl.firebaseapp.com",
  databaseURL: "https://findingmydogs-kmitl.firebaseio.com",
  projectId: "findingmydogs-kmitl",
  storageBucket: "findingmydogs-kmitl.appspot.com",
  messagingSenderId: "20173837686"
};
firebase.initializeApp(config);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AdoptDetailPage,
    AdoptGetPage,
    AdoptGivePage,
    AdoptTabPage,
    AdoptMainPage,
    TipPage,
    LoginPage,
    MyAnnouncePage,
    UserProfilePage,
    LostAnnouncePage,
    LostAnnounceDetailPage,
    LostFindFailPage,
    LostInformPage,
    LostInformThankPage,
    LostMainPage,
    LostRelatedPage,
    LostRelatedDetailPage,
    LostStockFoundPage,
    LostStockMissPage,
    MyDogPage,
    AddMyDogPage,
    MyDogDetailPage,
    TabPage,
    InformFoundPage,
    MyNotiPage,
    MyNotiDetailPage,
    FilterResultPage,
    BreedListPage,
    VaccineDetailPage,
    UpdateAnnouceLostPage,
    UpdateAnnouceAdoptPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    AdoptDetailPage,
    AdoptGetPage,
    AdoptGivePage,
    AdoptTabPage,
    AdoptMainPage,
    TipPage,
    LoginPage,
    MyAnnouncePage,
    UserProfilePage,
    LostAnnouncePage,
    LostAnnounceDetailPage,
    LostFindFailPage,
    LostInformPage,
    LostInformThankPage,
    LostMainPage,
    LostRelatedPage,
    LostRelatedDetailPage,
    LostStockFoundPage,
    LostStockMissPage,
    MyDogPage,
    AddMyDogPage,
    MyDogDetailPage,
    TabPage,
    InformFoundPage,
    MyNotiPage,
    MyNotiDetailPage,
    FilterResultPage,
    BreedListPage,
    VaccineDetailPage,
    UpdateAnnouceLostPage,
    UpdateAnnouceAdoptPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    AngularFireModule,
    AngularFireAuth,
    AngularFireDatabase,
    Facebook,
    UserServiceProvider,
    ImageProvider,
    Camera,
    File,
    Toast,
    DatabaseProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BreedProvider,
    PredictProvider,
    GoogleMaps,
    Geolocation,
    LocationProvider,
    VaccineProvider,
  ]
})
export class AppModule {

}
