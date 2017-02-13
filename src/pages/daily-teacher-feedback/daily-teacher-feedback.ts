import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";

/*
  Generated class for the DailyTeacherFeedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daily-teacher-feedback',
  templateUrl: 'daily-teacher-feedback.html',
  providers: [Translator]
})
export class DailyTeacherFeedbackPage {
  private translate: TranslateService;
  constructor(public navCtrl: NavController, public translator: Translator) {
    this.translate = translator.translatePipe;
  }

  ionViewDidLoad() {
    console.log('Hello DailyTeacherFeedbackPage Page');
  }

}
