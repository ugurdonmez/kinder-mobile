import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Homework} from "../../providers/homework";
import {Camera} from "ionic-native";

/*
  Generated class for the Homeworks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-homeworks',
  templateUrl: 'homeworks.html',
  providers: [Translator, Homework]
})
export class HomeworksPage {
  private translate: TranslateService;
  constructor(public navCtrl: NavController, public translator: Translator, private homeworkProvider: Homework,
  private alertCtrl: AlertController) {
    this.translate = translator.translatePipe;
  }

  ionViewDidLoad() {
    console.log('Hello HomeworksPage Page');
  }

  private homeworkProviderTest(){
    let homework = {
      subject: "mocksub",
      content: "mockcont",
      creationDate: "crdate",
      dueDate: "duedate"
  };
    this.homeworkProvider.addHomework("-Ketn4qOsNQOA0vSjZRC", homework);
    this.homeworkProvider.deleteHomework("-Ketn4qOsNQOA0vSjZRC", "-Kg9pfK0TOSvLoSfe4OW");
    this.homeworkProvider.getHomeworks("-Ketn4qOsNQOA0vSjZRC").subscribe(snapshot => {
      console.log(snapshot);
    });

    var imageSource;
    let classId = "-Ketn4qOsNQOA0vSjZRC";
    let homeworkId = "-Kg9pl5uWy5w9F9uPaVL";
    let confirm = this.alertCtrl.create({
      title: this.translate.instant('Image source?'),
      message: '',
      buttons: [
        {
          text: this.translate.instant('CAMERA'),
          handler: () => {
            imageSource = Camera.PictureSourceType.CAMERA;
            this.homeworkProvider.addAttachmentToHomework(classId, homeworkId, imageSource);
          }
        },
        {
          text: this.translate.instant('SAVEDPHOTOALBUM'),
          handler: () => {
            imageSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;
            this.homeworkProvider.addAttachmentToHomework(classId, homeworkId, imageSource);
          }
        },
        {
          text: this.translate.instant('PHOTOLIBRARY'),
          handler: () => {
            imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
            this.homeworkProvider.addAttachmentToHomework(classId, homeworkId, imageSource);
          }
        }
      ]
    });
    confirm.present();

    let attachmentId = "-Kg9sXQG-_jLx3oM2nfP";
    this.homeworkProvider.removeAttachmentFromHomework(classId, homeworkId, attachmentId);
    // this.homeworkProvider.markStudentCompleted(classId, homeworkId, "studentUserId")
    this.homeworkProvider.markStudentCompleted(classId, homeworkId, "studentUserId2")
    this.homeworkProvider.markStudentCompleted(classId, homeworkId, "studentUserId3")
    this.homeworkProvider.markStudentNotCompleted(classId, homeworkId, "studentUserId")
  }

}
