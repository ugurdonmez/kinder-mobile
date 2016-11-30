import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Calender page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html'
})
export class CalenderPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CalenderPage Page');
  }

}
