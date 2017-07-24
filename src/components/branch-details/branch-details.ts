import {Component, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Branches} from "../../providers/branches";
import {BranchModel} from "../../models/branch-model";
import {NavController, AlertController} from "ionic-angular";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
   selector: 'branch-details',
   templateUrl: 'branch-details.html',
   providers: [Branches, Translator]
})

export class BranchDetailsDirective implements OnInit {

   private branch: BranchModel
   private branchDetailsForm: FormGroup;
   private translate: TranslateService;

   constructor(public branchProvider: Branches,
               public translator: Translator,
               public formBuilder: FormBuilder,
               public alertCtrl: AlertController) {
      this.translate = translator.translatePipe;
      this.branchProvider.getBranchAdminBranches()
         .then(res => {
            this.branch = res[0] // here, we assume user has only one branch.
            this.branchDetailsForm = this.formBuilder.group({
               'id': [this.branch.id, Validators.required],
               'name': [this.branch.name, Validators.required],
               'tel': [this.branch.tel, Validators.required],
               'manager': [this.branch.manager, Validators.required],
               'manager_mail': [this.branch.manager_mail, Validators.required],
               'manager_tel': [this.branch.manager_tel, Validators.required],
               'address': [this.branch.address, Validators.required],
               'logoURL': [this.branch.logoURL, Validators.required],
               'branchAdminId': [this.branch.branchAdminId]
            });
         })
   }

   ngOnInit(): void {
      // console.log('TeacherListDirective: onInit()')
   }

   private updateBranchButtonClicked(): void {
      if (this.branchDetailsForm.valid) {
         this.branchProvider.updateBranch(this.branchDetailsForm.value);

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

   private updatePhotoClicked(): void {
      this.branchProvider.newPhoto(this.branch.id);
   }

}
