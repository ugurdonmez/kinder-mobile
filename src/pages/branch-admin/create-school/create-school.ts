import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {SchoolModel} from "../../../models/school-model";
import {Classes} from "../../../providers/classes";
import {Schools} from "../../../providers/schools";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Translator} from "../../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {Branches} from "../../../providers/branches";
import {BranchAdminHomePage} from "../home/home";

@Component({
   selector: 'page-branch-admin-create-school',
   templateUrl: 'create-school.html'
})

export class BranchAdminCreateSchoolPage {

   private school: SchoolModel;
   private translate: TranslateService;
   private createSchoolForm: FormGroup;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private classProvider: Classes,
               public formBuilder: FormBuilder,
               public translator: Translator,
               public alertCtrl: AlertController,
               private branchProvider: Branches,
               private schoolProvider: Schools) {
      this.translate = translator.translatePipe;
      this.branchProvider.getBranchAdminBranches().then(branchAdminBranches => {
         let branch = branchAdminBranches[0] // we assume branch admin has only one branch
         this.createSchoolForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'membershipEnd': [''],
            'membershipStart': [''],
            'buildingAddress': ['', Validators.required],
            'branchId': [branch.id, Validators.required],
            'isActivated': ['', Validators.required],
            'logoURL': [''],
            'managerName': ['', Validators.required],
            'managerTel': ['', Validators.required],
            'activationEmail': ['', Validators.required],
            'schoolTelephone': ['', Validators.required],
            'secondContactPersonName': [''],
            'secondContactTelNo': [''],
            'branchAdminId': [branch.branchAdminId, Validators.required],
            'schoolAdminEmail': ['']
         })
      })
   }

   ionViewDidLoad() {

   }

   private createSchoolButtonClicked(): void {
      if (this.createSchoolForm.valid) {
         this.schoolProvider.addSchool(this.createSchoolForm.value);
         let alert = this.alertCtrl.create({
            title: this.translate.instant('Successful'),
            buttons: [{
                  text: this.translate.instant('OK'),
                  handler: data => {this.navCtrl.setRoot(BranchAdminHomePage)}
               }]
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
