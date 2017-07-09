import {Component, OnInit, Input} from "@angular/core";
import {Branches} from "../../providers/branches";
import {Translator} from "../../app/translator";
import {ClassModel} from "../../models/class-model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {TeacherModel} from "../../models/teacher-model";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {Classes} from "../../providers/classes";
import {Teachers} from "../../providers/teachers";
import {AuthData} from "../../providers/auth-data";
import {UserModel} from "../../models/user-model";
import {ParentModel} from "../../models/parent-model";
import {Parents} from "../../providers/parents";

@Component({
   selector: 'class-details-admin',
   templateUrl: 'class-details-admin.html',
   providers: [Branches, Translator]
})

export class ClassDetailsDirective implements OnInit {

   @Input() role: string;
   @Input() _class: ClassModel;

   private editClassForm: FormGroup;
   private translate: TranslateService;
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

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
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

      this.parentProvider.getParentsOfClass(this._class.id).then(res => {
         // console.log("school-details page listedClasses:")
         // console.log(res)
         this.parentsOfClass = res
      })

      this.teacherProvider.getTeachersOfSchool(this._class.schoolId).then(res => {
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

   private deleteClassButtonClicked(){
      let confirm = this.alertCtrl.create({
         title: this.translate.instant('Delete Class?'),
         message: this.translate.instant('Sure you want to delete this class? A delete operation is irreversible.'),
         buttons: [
            {
               text: this.translate.instant('Cancel'),
               handler: () => {
               }
            },
            {
               text: this.translate.instant('Ok'),
               handler: () => {
                  this.classProvider.deleteClass(this._class.id);
                  this.navCtrl.pop();
               }
            }
         ]
      });
      confirm.present();
   }
}
