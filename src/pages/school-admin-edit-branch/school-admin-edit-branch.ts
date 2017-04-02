import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Branches } from '../../providers/branches';

import { ClassModel } from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home-old/home";


@Component({
  selector: 'page-school-admin-edit-branch',
  templateUrl: 'school-admin-edit-branch.html',
    providers: [Branches, Translator]
})

export class SchoolAdminEditBranchPage {
    classes: Array<ClassModel> = [];
    translate: TranslateService;
    branchDetailsForm: any;
    branch: any;
    branchId: string;


    constructor(public navCtrl: NavController, public branchesProvider: Branches, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, private navParams: NavParams) {
        this.branchId = navParams.get('branchId');
        this.branch = this.branchesProvider.getBranch(this.branchId);
        this.translate = translator.translatePipe;

        this.branch.subscribe(snapshot => {
            this.branchDetailsForm = formBuilder.group(
                {
                    'id': [this.branchId, Validators.required],
                    'name': [snapshot.name, Validators.required],
                    'tel': [snapshot.tel, Validators.required],
                    'manager': [snapshot.manager, Validators.required],
                    'manager_mail': [snapshot.manager_mail, Validators.required],
                    'manager_tel': [snapshot.manager_tel, Validators.required],
                    'address': [snapshot.address, Validators.required],
                    'adminUserId': [snapshot.adminUserId]
                }
            );
        });

    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    updateBranch(){
        if (this.branchDetailsForm.valid){
            this.branchesProvider.updateBranch(this.branchDetailsForm.value);
            this.navCtrl.pop();
        }
        else{
            let alert = this.alertCtrl.create({
                title: this.translate.instant('Cannot Submit!'),
                subTitle: this.translate.instant('At least one of the fields are not valid.'),
                buttons: [this.translate.instant('OK')]
            });
            alert.present();
        }
    }

    deleteBranch(){
    let confirm = this.alertCtrl.create({
        title: this.translate.instant('Delete Branch?'),
        message: this.translate.instant('Sure you want to delete this branch? This will also remove the schools and classes in this branch. A delete operation is irreversible.'),
        buttons: [
            {
                text: this.translate.instant('Cancel'),
                handler: () => {
                }
            },
            {
                text: this.translate.instant('Ok'),
                handler: () => {
                    this.branchesProvider.deleteBranch(this.branchId);
                    this.navCtrl.setRoot(HomePage);
                }
            }
        ]
    });
    confirm.present();

    }

    newPhoto(){
        this.branchesProvider.newPhoto(this.branchId);
    }
}
