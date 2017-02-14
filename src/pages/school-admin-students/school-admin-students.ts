import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the SchoolAdminStudents page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-students',
  templateUrl: 'school-admin-students.html',
  providers: [Translator]
})
export class SchoolAdminStudentsPage {
  private translate: TranslateService;

  constructor(public navCtrl: NavController, public translator: Translator) {
    this.translate = translator.translatePipe;}

  ionViewDidLoad() {
    console.log('Hello SchoolAdminStudentsPage Page');
  }

}
