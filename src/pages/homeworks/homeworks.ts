import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Homeworks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-homeworks',
  templateUrl: 'homeworks.html'
})
export class HomeworksPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HomeworksPage Page');
  }

}
