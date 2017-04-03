import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import {Teachers} from '../../providers/teachers';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {SchoolAdminHomePage} from "../homes/school-admin-home/school-admin-home";

@Component({
   selector: 'page-school-admin-add-update-teacher',
   templateUrl: 'school-admin-add-update-teacher.html',
   providers: [Teachers, Translator]
})

export class SchoolAdminAddUpdateTeacherPage {
   teacherDetailsForm: any;
   private translate: TranslateService;
   teacherId: string;
   private schoolId: string;

   constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
               public teachersProvider: Teachers, public translator: Translator, private navParams: NavParams) {
      this.translate = translator.translatePipe;
      this.schoolId = navParams.get('schoolId');
      this.teacherDetailsForm = formBuilder.group(
         {
            'name': ['', Validators.minLength(1)],
            'surname': ['', Validators.minLength(1)],
            'notes': [''],
            'schoolId': [this.schoolId, Validators.required]
         }
      );

   }

   ionViewDidLoad() {
      console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
   }

   newPhoto() {
      this.teachersProvider.newPhoto(this.teacherId);
   }

   addNewTeacher() {
      // this.teacherId = this.teachersProvider.addTeacher(this.teacherDetailsForm.value);
      this.teacherId = this.teachersProvider.registerThisUserAsTeacher(this.teacherDetailsForm.value);
      this.newPhoto();
      // this.navCtrl.pop();
      this.navCtrl.setRoot(SchoolAdminHomePage);
   }

}
