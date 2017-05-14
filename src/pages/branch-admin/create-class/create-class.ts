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
import {AuthData} from "../../../providers/auth-data";

@Component({
   selector: 'page-branch-admin-create-class',
   templateUrl: 'create-class.html'
})

export class BranchAdminCreateClassPage {

   private listedClasses: ClassModel[];
   private school: SchoolModel;
   private createClassForm: FormGroup;
   private translate: TranslateService;
   private teachersOfSchool: TeacherModel[];

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private classProvider: Classes,
               private teacherProvider: Teachers,
               public formBuilder: FormBuilder,
               public translator: Translator,
               public alertCtrl: AlertController) {
      this.translate = translator.translatePipe;
      this.school = this.navParams.get('school');
      this.createClassForm = this.formBuilder.group({
         name: ['', Validators.required],
         teacher_id: ['', Validators.required],
         age: ['', Validators.required],
         current: [0, Validators.required],
         maximum: ['', Validators.required],
         schoolId: [this.school.id, Validators.required],
         branchAdminId: [this.school.branchAdminId, Validators.required],
         schoolAdminId: [this.school.schoolAdminId, Validators.required]
      })

      teacherProvider.getTeachersOfSchool(this.school.id).then(res => {
         // console.log("school-details page listedClasses:")
         // console.log(res)
         this.teachersOfSchool = res
      })
   }

   ionViewDidLoad() {

   }

   private createClassButtonClicked(): void {
      // console.log("branch admin create-class page, createClassButtonClicked:")
      // console.log(this.createClassForm)
      if (this.createClassForm.valid) {
         let newClass = new ClassModel().fromObject(this.createClassForm.value)
         delete newClass.id
         delete newClass.attendance
         delete newClass.gallery
         delete newClass.homeworks
         delete newClass.invitations
         delete newClass.wall
         delete newClass.wallRead
         delete newClass.teacher_name
         this.classProvider.addClass(newClass);
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
