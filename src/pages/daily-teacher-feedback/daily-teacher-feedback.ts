import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {Translator} from "../../app/translator";
import {Feedback} from "../../providers/feedback";
import { RandomStringGenerator } from "../../helpers/randomStringGenerator";

/*
  Generated class for the DailyTeacherFeedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-daily-teacher-feedback',
  templateUrl: 'daily-teacher-feedback.html',
  providers: [Translator, Feedback, RandomStringGenerator]
})
export class DailyTeacherFeedbackPage {
  private translate: TranslateService;

  constructor(public navCtrl: NavController, public translator: Translator, private feedbackProvider: Feedback,
  private randomStringGenerator: RandomStringGenerator) {
    this.translate = translator.translatePipe;
  }

  ionViewDidLoad() {
    console.log('Hello DailyTeacherFeedbackPage Page');
  }

  private feedbackProviderTest(){
    let feedback = {
      breakfast: true,
      lunch: false,
      midafternoonsnack: false,
      siesta: true,
      comment: this.randomStringGenerator.get(30),
      activities: ["lego", "music", "drawing", "etc"]
    };
    this.feedbackProvider.sendFeedbackForStudent(
        this.randomStringGenerator.get(8),
        this.randomStringGenerator.get(8),
        this.randomStringGenerator.get(8),
        feedback
    );

    this.feedbackProvider.getFeedbackForStudent("IQKPLTT", "IDFMJKO", "PPAOXDP").subscribe(snapshot => {
      console.log(snapshot);
    });

    this.feedbackProvider.deleteFeedbackForStudent("IQKPLTT", "IDFMJKO", "PPAOXDP");

  }

}
