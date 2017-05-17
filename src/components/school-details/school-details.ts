import {Component, OnInit, Input} from "@angular/core";
import {Branches} from "../../providers/branches";
import {Translator} from "../../app/translator";
import {ClassModel} from "../../models/class-model";
import {SchoolModel} from "../../models/school-model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TranslateService} from "ng2-translate";
import {TeacherModel} from "../../models/teacher-model";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {Classes} from "../../providers/classes";
import {Teachers} from "../../providers/teachers";
import {Schools} from "../../providers/schools";
import {AuthData} from "../../providers/auth-data";
import {BranchAdminCreateClassPage} from "../../pages/branch-admin/create-class/create-class";
import {BranchAdminClassDetailsPage} from "../../pages/branch-admin/class-details/class-details";
import {UserModel} from "../../models/user-model";
import {SchoolAdminCreateClassPage} from "../../pages/school-admin/create-class/create-class";
import {SchoolAdminClassDetailsPage} from "../../pages/school-admin/class-details/class-details";

@Component({
   selector: 'school-details',
   templateUrl: 'school-details.html',
   providers: [Branches, Translator]
})

export class SchoolDetailsDirective implements OnInit {

   @Input() school: SchoolModel;
   @Input() role: string;
   private listedClasses: ClassModel[];
   // private school: SchoolModel;
   private schoolDetailsForm: FormGroup;
   private translate: TranslateService;
   private listedTeachers: Promise<TeacherModel[]>;
   private user: UserModel;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private classProvider: Classes,
               private teacherProvider: Teachers,
               public formBuilder: FormBuilder,
               public schoolProvider: Schools,
               public translator: Translator,
               public alertCtrl: AlertController,
               private authData: AuthData) {

      // console.log("school-details directive constructor:")

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      // this.school = this.navParams.get('school');
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

      this.classProvider.getClassesOfSchool(this.school.id).then(res => {
         // console.log("school-details page listedClasses:")
         // console.log(res)
         this.listedClasses = res
      })

      this.listedTeachers = this.teacherProvider.getTeachersOfSchool(this.school.id)

      this.authData.getUser().then( user => {
         this.user = user
      })
   }

   ionViewDidLoad() {

   }

   private addClassButtonClicked():void{
      if (this.role == 'branch-admin'){
         this.navCtrl.push(BranchAdminCreateClassPage, {'school': this.school})
      }
      else if(this.role == 'school-admin'){
         this.navCtrl.push(SchoolAdminCreateClassPage, {'school': this.school})
      }
   }

   private openClassPage(_class): void{
      if (this.role == 'branch-admin'){
         this.navCtrl.push(BranchAdminClassDetailsPage, {'class': _class})
      }
      else if(this.role == 'school-admin'){
         this.navCtrl.push(SchoolAdminClassDetailsPage, {'class': _class})
      }
   }

   private getClassesOfTeachers(teacherId){
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

   private inviteTeacherButtonClicked(): void {
      let prompt = this.alertCtrl.create({
         title: 'Invite Teacher',
         message: "Enter e-mail address of teacher.",
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
                  invitedUser.role = 'teacher'
                  invitedUser.schoolId = this.school.id
                  invitedUser.branchAdminId = this.school.branchAdminId
                  // checking if schoolAdminId exists. because there are some cases where schoolAdminId doesn't
                  // exist. but we can't push to firebase if a property of invitedUser is undefined.
                  if(!!this.school.schoolAdminId){
                     invitedUser.schoolAdminId = this.school.schoolAdminId
                  }

                  this.authData.newInvitation(invitedUser);
               }
            }
         ]
      });
      prompt.present();
   }

   private newPhoto(){
      this.schoolProvider.newPhoto(this.school.id)
   }

   private deleteSchoolButtonClicked(){
      let confirm = this.alertCtrl.create({
         title: this.translate.instant('Delete School?'),
         message: this.translate.instant('Sure you want to delete this school? ' +
            'This will also remove the classes in this school. ' +
            'A delete operation is irreversible.'),
         buttons: [
            {
               text: this.translate.instant('Cancel'),
               handler: () => {
               }
            },
            {
               text: this.translate.instant('Ok'),
               handler: () => {
                  this.schoolProvider.deleteSchool(this.school.id);
                  this.navCtrl.pop();
               }
            }
         ]
      });
      confirm.present();
   }

}
