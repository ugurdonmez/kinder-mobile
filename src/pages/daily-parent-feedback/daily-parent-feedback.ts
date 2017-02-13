import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";

/*
  Generated class for the DailyParentFeedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daily-parent-feedback',
  templateUrl: 'daily-parent-feedback.html',
  providers: [Translator]
})
export class DailyParentFeedbackPage {
  private translate: TranslateService;
  constructor(public navCtrl: NavController, public translator: Translator) {
    this.translate = translator.translatePipe;
  }

  ionViewDidLoad() {
    console.log('Hello DailyParentFeedbackPage Page');
  }

}
