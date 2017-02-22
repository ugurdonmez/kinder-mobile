import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import { Teachers } from '../../providers/teachers';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the SchoolAdminAddUpdateTeacher page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-add-update-teacher',
  templateUrl: 'school-admin-add-update-teacher.html',
    providers: [Teachers, Translator]
})
export class SchoolAdminAddUpdateTeacherPage {
    teacherDetailsForm: any;
    private translate: TranslateService;
    teacherId: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public teachersProvider: Teachers, public translator: Translator) {
      this.translate = translator.translatePipe;
      this.teacherDetailsForm = formBuilder.group(
          {
              'name': ['', Validators.minLength(1)],
              'surname': ['', Validators.minLength(1)],
              'notes': ['']
          }
      );

  }

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
  }

    newPhoto(){
        this.teachersProvider.newPhoto(this.teacherId);
    }

    addNewTeacher(){
        this.teacherId = this.teachersProvider.addTeacher(this.teacherDetailsForm.value);
        this.newPhoto();
        this.navCtrl.pop();
    }

}
