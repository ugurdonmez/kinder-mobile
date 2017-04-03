import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Schools} from '../../providers/schools';
import {SchoolModel} from '../../models/school-model';
import {ClassModel} from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {Branches} from "../../providers/branches";
import {AuthData} from "../../providers/auth-data";
import {SchoolAdminClassesPage} from "../school-admin-classes/school-admin-classes";
import {SchoolAdminHomePage} from "../homes/school-admin-home/school-admin-home";


@Component({
   selector: 'page-school-admin-add-update-school',
   templateUrl: 'school-admin-add-update-school.html',
   providers: [Schools, Translator, Branches, AuthData]
})

export class SchoolAdminAddUpdateSchoolPage {
   mockSchool: SchoolModel = new SchoolModel();
   classes: Array<ClassModel> = [];
   translate: TranslateService;
   schoolDetailsForm: any;
   private branchId: string;
   private schoolId: string;

   constructor(public navCtrl: NavController,
               public schoolsProvider: Schools,
               public translator: Translator,
               public formBuilder: FormBuilder,
               private navParams: NavParams,
               public alertCtrl: AlertController,
               public branchesProvider: Branches,
               private authData: AuthData) {

      this.branchId = navParams.get('branchId');
      this.schoolDetailsForm = formBuilder.group({
            'name': ['', Validators.required],
            'buildingAddress': ['', Validators.required],
            'managerName': ['', Validators.required],
            'managerTel': ['', Validators.required],
            'activationEmail': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            'schoolTelephone': ['', Validators.required],
            'secondContactPersonName': [''],
            'secondContactTelNo': [''],
            'isActivated': ['True', Validators.required],
            'branchId': [this.branchId]
         }
      );
      this.translate = translator.translatePipe;
   }

   ionViewDidLoad() {
      console.log('Hello SchoolAdminAddUpdateSchoolPage Page');
   }

   addNewSchool() {
      if (this.schoolDetailsForm.valid) {
         this.schoolDetailsForm.value.isActivated = Boolean(this.schoolDetailsForm.value.isActivated);
         // this.schoolDetailsForm.value.maximum = Number(this.classDetailsForm.value.maximum);
         this.schoolId = this.schoolsProvider.addSchool(this.schoolDetailsForm.value);
         this.newPhoto();
         this.authData.getUser().subscribe(snapshot => {
            if (snapshot.role === "school-admin") {//user is school admin
               this.navCtrl.setRoot(SchoolAdminHomePage);
               this.navCtrl.push(SchoolAdminClassesPage, {schoolId: this.schoolId});
            }
            else {
               this.navCtrl.pop();
            }
         })
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

   logout() {
      console.log('logout clicked');
      this.authData.logoutUser();
   }

   newPhoto() {
      this.schoolsProvider.newPhoto(this.schoolId);
   }
}
