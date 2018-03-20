import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
/*
  Generated class for the VaccineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VaccineProvider {
  playerID;
  uid;
  dogID;
  constructor(public db: AngularFireDatabase) {
    console.log('Hello VaccineProvider Provider'); //แปลงปี เดือน วีค เป็น วีครวมทั้งหมดไว้คำนวณ
    window["plugins"].OneSignal.getIds((ids => {
      this.playerID = ids.userId;
    }));
  }
  setupVaccine(year: number, month: number, week: number, uid, dogKey) {
    this.dogID = dogKey;
    this.uid = uid;
    var sumWeek: number = (year * 52) + (month * 4) + week;
    console.log(sumWeek);
    if (sumWeek >= 52) {
      this.week52(sumWeek);
    }
    else if (sumWeek >= 26 && sumWeek < 52) {
      this.week26(sumWeek);
    }
    else if (sumWeek >= 16 && sumWeek < 26) {
      this.week16(sumWeek);
    }
    else if (sumWeek >= 12 && sumWeek < 16) {
      this.week12(sumWeek);
    }
    else if (sumWeek >= 8 && sumWeek < 12) {
      this.week8(sumWeek);
    }
    else if (sumWeek >= 6 && sumWeek < 8) {
      this.week6(sumWeek);
    }
    else if (sumWeek >= 4 && sumWeek < 6) {
      this.week4(sumWeek);
    }
    else { //if (sumWeek >= 3 && sumWeek < 4)
      this.week3(sumWeek);
    }
  }
  week52(sumWeek) { //>52weeks
    if (sumWeek >= 52) { //เรียกเฉพาะตอนอายุเกินปี
      var overWeek = sumWeek - 52; //สัปดาห์ที่เกินปีนึงมา
      var moreWeek = 52 - overWeek; //อีกกี่สัปดาห์จะต้องฉีดอีกรอบ (ครบรอบปีอีกครั้ง)

      var date = new Date();
      date.setDate(date.getDate() + moreWeek * 7)

      var notificationObj = {
        contents: {
          en: "Please check detail in application.",
          th: "โปรดตรวจสอบรายละเอียด"
        },
        headings: {
          en: "Your dog now need to be vaccinated.",
          th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
        },
        include_player_ids: [this.playerID],
        send_after: date.toString()
      };
      window["plugins"].OneSignal.postNotification(notificationObj,
        (successResponse) => {
          var time = date.getTime();
          this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week52: time });
          
        },
        (failedResponse) => {
          //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
          alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
      console.log('w52' + "will notify on " + date.toString());
    }
  }
  week26(sumWeek) { //>26weeks
    var moreWeek = 52 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)

    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week26: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w26' + "will notify on " + date.toString());
    this.week52(sumWeek);
  }
  week16(sumWeek) { //>16weeks
    var moreWeek = 26 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    console.log('w16' + "will notify on " + date.toString());
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week16: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    this.week26(sumWeek);
  }
  week12(sumWeek) { //>12weeks
    var moreWeek = 16 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week12: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w12' + "will notify on " + date.toString());
    this.week16(sumWeek);
  }
  week8(sumWeek) { //>8weeks
    var moreWeek = 12 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week8: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w8' + "will notify on " + date.toString());
    this.week12(sumWeek);
  }
  week6(sumWeek) { //>6weeks
    var moreWeek = 8 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week6: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w6' + "will notify on " + date.toString());
    this.week8(sumWeek);
  }
  week4(sumWeek) { //>4weeks
    var moreWeek = 6 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week4: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w4' + "will notify on " + date.toString());
    this.week6(sumWeek);
  }
  week3(sumWeek) { //>3weeks
    var moreWeek = 4 - sumWeek;
    var date = new Date();
    date.setDate(date.getDate() + moreWeek * 7)
    var notificationObj = {
      contents: {
        en: "Please check detail in application.",
        th: "โปรดตรวจสอบรายละเอียด"
      },
      headings: {
        en: "Your dog now need to be vaccinated.",
        th: "สุนัขของท่านถึงกำหนดฉีดวัคซีน"
      },
      include_player_ids: [this.playerID],
      send_after: date.toString()
    };
    window["plugins"].OneSignal.postNotification(notificationObj,
      (successResponse) => {
        var time = date.getTime();
        this.db.database.ref("/userProfile/" + this.uid+"/notiTime/"+this.dogID+"/").update({ week3: time });
        
      },
      (failedResponse) => {
        //alert("Notification Post Failed playerID ->: " +JSON.stringify(playerIDList));
        alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    console.log('w3' + "will notify on " + date.toString());
    this.week4(sumWeek);
  }

}
