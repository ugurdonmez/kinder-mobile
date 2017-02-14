import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the SchoolAdminAddUpdateStudent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-add-update-student',
  templateUrl: 'school-admin-add-update-student.html',
  providers: [Translator]
})
export class SchoolAdminAddUpdateStudentPage {
    private translate: TranslateService;

  constructor(public navCtrl: NavController, public translator: Translator) {
    this.translate = translator.translatePipe;
  }

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateStudentPage Page');
  }

}
