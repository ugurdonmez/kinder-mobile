import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { Branches } from '../../providers/branches';

import { ClassModel } from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-school-admin-add-update-branch',
  templateUrl: 'school-admin-add-update-branch.html',
    providers: [Branches, Translator]
})

export class SchoolAdminAddUpdateBranchPage {
    classes: Array<ClassModel> = [];
    translate: TranslateService;
    branchDetailsForm: any;

    constructor(public navCtrl: NavController, public branches: Branches, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController) {
        this.translate = translator.translatePipe;
        this.branchDetailsForm = formBuilder.group(
            {
                'name': ['', Validators.required],
                'tel': ['', Validators.required],
                'manager': ['', Validators.required],
                'manager_mail': ['', Validators.compose([Validators.required, EmailValidator.isValid])],
                'manager_tel': ['', Validators.required],
                'address': ['', Validators.required]
            }
        );
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    addNewBranch(){
        //console.log("addNewBranch() triggered.");
        // this.branches.addBranch(this.mockBranch);

        if (this.branchDetailsForm.valid){
            this.branches.addBranch(this.branchDetailsForm.value);
            this.navCtrl.setRoot(HomePage);
        }
        else{
            let alert = this.alertCtrl.create({
                title: 'Cannot Submit!',
                subTitle: 'At least one of the fields are not valid.',
                buttons: ['OK']
            });
            alert.present();
        }

    }
}
