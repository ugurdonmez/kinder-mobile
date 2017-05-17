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
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {UserModel} from "../../../models/user-model";

@Component({
   selector: 'page-branch-admin-class-details',
   templateUrl: 'class-details.html'
})

export class BranchAdminClassDetailsPage {

   private editClassForm: FormGroup;
   private translate: TranslateService;
   private _class: ClassModel;
   private parentsOfClass: ParentModel[];
   private teachersOfSchool: TeacherModel[];

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private classProvider: Classes,
               private teacherProvider: Teachers,
               public formBuilder: FormBuilder,
               public translator: Translator,
               public alertCtrl: AlertController,
               private parentProvider: Parents,
               private authData: AuthData) {
      this.translate = translator.translatePipe;
      this._class = this.navParams.get('class');
      // console.log('class details page called with:')
      // console.log(this._class)
      this.editClassForm = this.formBuilder.group({
         name: [this._class.name, Validators.required],
         teacher_id: [this._class.teacher_id, Validators.required],
         age: [this._class.age, Validators.required],
         current: [this._class.current, Validators.required],
         maximum: [this._class.maximum, Validators.required],
         schoolId: [this._class.schoolId, Validators.required],
         branchAdminId: [this._class.branchAdminId, Validators.required],
         schoolAdminId: [this._class.schoolAdminId, Validators.required],
         id: [this._class.id],
         attendance: [this._class.attendance],
         gallery: [this._class.gallery],
         homeworks: [this._class.homeworks],
         invitations: [this._class.invitations],
         wall: [this._class.wall],
         wallRead: [this._class.wallRead],
         teacher_name: [this._class.teacher_name]
      })

      parentProvider.getParentsOfClass(this._class.id).then(res => {
         // console.log("school-details page listedClasses:")
         // console.log(res)
         this.parentsOfClass = res
      })

      teacherProvider.getTeachersOfSchool(this._class.schoolId).then(res => {
         // console.log("school-details page listedClasses:")
         // console.log(res)
         this.teachersOfSchool = res
      })
   }

   ionViewDidLoad() {

   }

   private editClassButtonClicked(): void {
      if (this.editClassForm.valid) {
         let updatedClass = new ClassModel().fromObject(this.editClassForm.value)
         // console.log('edit class button clicked with:')
         // console.log(updatedClass)
         this.classProvider.updateClass(updatedClass);
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

   private inviteParentButtonClicked(){
      let prompt = this.alertCtrl.create({
         title: 'Invite Parent',
         message: "Enter e-mail address of parent.",
         inputs: [
            {
               name: 'email',
               placeholder: 'Email'
            },
         ],
         buttons: [
            {
               text: 'Cancel',
               handler: data => {
               }
            },
            {
               text: 'Invite',
               handler: data => {
                  let invitedUser = new UserModel()
                  invitedUser.email = data.email
                  invitedUser.role = 'parent'
                  invitedUser.classId = this._class.id
                  invitedUser.branchAdminId = this._class.branchAdminId
                  // checking if schoolAdminId exists. because there are some cases where schoolAdminId doesn't
                  // exist. but we can't push to firebase if a property of invitedUser is undefined.
                  if(!!this._class.schoolAdminId){
                     invitedUser.schoolAdminId = this._class.schoolAdminId
                  }

                  this.authData.newInvitation(invitedUser);
               }
            }
         ]
      });
      prompt.present();
   }
}
