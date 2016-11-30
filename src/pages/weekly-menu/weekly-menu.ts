import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the WeeklyMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weekly-menu',
  templateUrl: 'weekly-menu.html'
})
export class WeeklyMenuPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WeeklyMenuPage Page');
  }

}
