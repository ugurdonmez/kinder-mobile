import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {SchoolModel} from "../../../models/school-model";
import {ClassModel} from "../../../models/class-model";
import {Classes} from "../../../providers/classes";
import {Teachers} from "../../../providers/teachers";
import {TeacherModel} from "../../../models/teacher-model";
import {Schools} from "../../../providers/schools";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
   selector: 'page-branch-admin-school-details',
   templateUrl: 'school-details.html'
})

export class BranchAdminSchoolDetailsPage {

   private listedClasses: ClassModel[];
   private listedTeachers: TeacherModel[];
   private school: SchoolModel;
   private schoolDetailsForm: FormGroup;
   private translate: TranslateService;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private classProvider: Classes,
               private teacherProvider: Teachers,
               public formBuilder: FormBuilder,
               public schoolProvider: Schools,
               public translator: Translator,
               public alertCtrl: AlertController
   ) {
      this.translate = translator.translatePipe;
      this.school = this.navParams.get('school');
      this.schoolDetailsForm = this.formBuilder.group({
         'id': [this.school.id, Validators.required],
         'name': [this.school.name, Validators.required],
         'membershipEnd': [this.school.membershipEnd],
         'membershipStart': [this.school.membershipStart],
         'buildingAddress': [this.school.buildingAddress, Validators.required],
         'branchId': [this.school.branchId, Validators.required],
         'isActivated': [this.school.isActivated, Validators.required],
         'logoURL': [this.school.logoURL],
         'managerName': [this.school.managerName, Validators.required],
         'managerTel': [this.school.managerTel, Validators.required],
         'activationEmail': [this.school.activationEmail, Validators.required],
         'schoolTelephone': [this.school.schoolTelephone, Validators.required],
         'secondContactPersonName': [this.school.secondContactPersonName],
         'secondContactTelNo': [this.school.secondContactTelNo],
         'branchAdminId': [this.school.branchAdminId, Validators.required],
         'schoolAdminId': [this.school.schoolAdminId]
      })

      classProvider.getClassesOfSchool(this.school.id).then(res => {
         console.log("school-details page listedClasses:")
         console.log(res)
         this.listedClasses = res
      })

      teacherProvider.getTeachersOfSchool(this.school.id).then(res => {
         console.log("school-details page listedTeachers:")
         console.log(res)
         this.listedTeachers = res
      })
   }

   ionViewDidLoad() {

   }

   getClassesOfTeachers(teacherId) {
      return []
   }

   private updateSchoolButtonClicked(): void {
      if (this.schoolDetailsForm.valid) {
         this.schoolProvider.updateSchool(this.schoolDetailsForm.value);
         let alert = this.alertCtrl.create({
            title: this.translate.instant('Successful'),
            buttons: [this.translate.instant('OK')]
         });
         alert.present();
      }
      else {
         let alert = this.alertCtrl.create({
            title: this.translate.instant('Cannot Submit!'),
            subTitle: this.translate.instant('At least one of the fields are not valid.'),
            buttons: [this.translate.instant('OK')]
         });
         alert.present();
      }
   }
}
