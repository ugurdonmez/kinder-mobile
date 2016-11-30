import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the WeeklyActivityPlan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weekly-activity-plan',
  templateUrl: 'weekly-activity-plan.html'
})
export class WeeklyActivityPlanPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WeeklyActivityPlanPage Page');
  }

}
