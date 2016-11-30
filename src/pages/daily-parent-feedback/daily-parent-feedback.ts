import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DailyParentFeedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daily-parent-feedback',
  templateUrl: 'daily-parent-feedback.html'
})
export class DailyParentFeedbackPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DailyParentFeedbackPage Page');
  }

}
