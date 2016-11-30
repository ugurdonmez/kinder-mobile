import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Attendance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})
export class AttendancePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AttendancePage Page');
  }

}
