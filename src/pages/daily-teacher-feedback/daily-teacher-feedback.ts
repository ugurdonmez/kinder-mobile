import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DailyTeacherFeedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daily-teacher-feedback',
  templateUrl: 'daily-teacher-feedback.html'
})
export class DailyTeacherFeedbackPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DailyTeacherFeedbackPage Page');
  }

}
