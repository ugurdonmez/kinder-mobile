import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

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
    private myUserRole: any;
    private branchIdOfUser: string;
    private allBranches: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, public authData: AuthData,
                private branchesProvider: Branches) {
        this.translate = translator.translatePipe;
        this.loadBranchIdOfUser();
        this.allBranches = this.branchesProvider.getAllBranches();
        this.authData.getUserRole().subscribe(snapshot => {
            this.myUserRole = snapshot.$value;
        });
        this.inviteOthersForm = formBuilder.group(
            {
                'email': ['', EmailValidator.isValid],
                'userRole': ['', Validators.required],
                'branchId': [this.branchIdOfUser]
            }
        );
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    inviteUserFormSubmit(){
        if (this.inviteOthersForm.valid){
            //invite user code here
            if(this.inviteOthersForm.value.userRole == "school-admin" || this.inviteOthersForm.value.userRole == "teacher"){
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

    private loadBranchIdOfUser() {
        if(this.myUserRole==="branch-admin"){
            this.branchesProvider.getUserBranches().subscribe(snapshot => {
                if (snapshot.length > 0) {
                    this.branchIdOfUser = snapshot[0].$key;
                }
                else{
                    this.branchIdOfUser = "";
                }
            })
        }
    }
}
