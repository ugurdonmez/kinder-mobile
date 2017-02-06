import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import { Teachers } from '../../providers/teachers';

/*
  Generated class for the SchoolAdminAddUpdateTeacher page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-school-admin-add-update-teacher',
  templateUrl: 'school-admin-add-update-teacher.html',
    providers: [Teachers]
})
export class SchoolAdminAddUpdateTeacherPage {
    teacherDetailsForm: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public teacherProvider: Teachers) {
      this.teacherDetailsForm = formBuilder.group(
          {
              'name': ['', Validators.minLength(1)],
              'surname': ['', Validators.minLength(1)],
              'notes': [''],
              'photoUrl': ['http://thegadgetfreaks.com/wp-content/uploads/2015/05/Anon-Woman.jpg']
          }
      );

  }

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
  }

    addNewTeacher(){
        this.teacherProvider.addTeacher(this.teacherDetailsForm.value);
        this.navCtrl.pop();
    }

}
