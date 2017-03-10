import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';

import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {AuthData} from "../../providers/auth-data";
import {Branches} from "../../providers/branches";
import {FirebaseListObservable} from "angularfire2";


@Component({
  selector: 'page-invite-others',
  templateUrl: 'invite-others.html',
    providers: [Translator, Branches]
})

export class InviteOthersPage {
    translate: TranslateService;
    inviteOthersForm: any;
    private sourcePage: string;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, public authData: AuthData,
                private branchesProvider: Branches, private navParams: NavParams) {
        this.translate = translator.translatePipe;
        this.sourcePage = navParams.get('sourcePage');

        if (this.sourcePage == 'HomePage'){
            this.inviteOthersForm = formBuilder.group(
                {
                    'email': ['', EmailValidator.isValid],
                    'userRole': ['', Validators.required],
                }
            );
        }
        else if(this.sourcePage == 'BranchPage'){
            this.inviteOthersForm = formBuilder.group(
                {
                    'email': ['', EmailValidator.isValid],
                    'userRole': [navParams.get('invitationRole')],
                    'branchId': [navParams.get('branchId')]
                }
            );
        }
        else if(this.sourcePage == 'SchoolPage'){
            this.inviteOthersForm = formBuilder.group(
                {
                    'email': ['', EmailValidator.isValid],
                    'userRole': [navParams.get('invitationRole')],
                    'schoolId': [navParams.get('schoolId')]
                }
            );
        }
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    inviteUserFormSubmit(){
        if (this.inviteOthersForm.valid){
            //invite user code here
            if(this.inviteOthersForm.value.userRole == "school-admin"){
                if(this.inviteOthersForm.value.branchId===null){
                    let alert = this.alertCtrl.create({
                        title: this.translate.instant('Cannot Submit!'),
                        subTitle: this.translate.instant('Branch Unknown.'),
                        buttons: [this.translate.instant('OK')]
                    });
                    alert.present();
                }
                else{
                    this.authData.newInvitation({
                        email: this.inviteOthersForm.value.email,
                        role: this.inviteOthersForm.value.userRole,
                        branchId: this.inviteOthersForm.value.branchId
                    });
                    this.navCtrl.pop();
                }
            }
            else if(this.inviteOthersForm.value.userRole == "teacher"){
                if(this.inviteOthersForm.value.schoolId===null){
                    let alert = this.alertCtrl.create({
                        title: this.translate.instant('Cannot Submit!'),
                        subTitle: this.translate.instant('School Unknown.'),
                        buttons: [this.translate.instant('OK')]
                    });
                    alert.present();
                }
                else{
                    this.authData.newInvitation({
                        email: this.inviteOthersForm.value.email,
                        role: this.inviteOthersForm.value.userRole,
                        schoolId: this.inviteOthersForm.value.schoolId
                    });
                    this.navCtrl.pop();
                }
            }
            else{
                this.authData.newInvitation({
                    email: this.inviteOthersForm.value.email,
                    role: this.inviteOthersForm.value.userRole
                });
                this.navCtrl.pop();
            }
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

    // private loadBranchIdOfUser() {
    //     if(this.myUserRole==="branch-admin"){
    //         this.branchesProvider.getUserBranches().subscribe(snapshot => {
    //             if (snapshot.length > 0) {
    //                 branchIdOfUser = snapshot[0].$key;
    //             }
    //             else{
    //                 branchIdOfUser = "";
    //             }
    //         })
    //     }
    // }
}
