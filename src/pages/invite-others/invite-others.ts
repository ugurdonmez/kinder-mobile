import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {AuthData} from "../../providers/auth-data";


@Component({
  selector: 'page-invite-others',
  templateUrl: 'invite-others.html',
    providers: [Translator]
})

export class InviteOthersPage {
    translate: TranslateService;
    inviteOthersForm: any;
    private myUserRole: any;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, public authData: AuthData) {
        this.translate = translator.translatePipe;
        this.inviteOthersForm = formBuilder.group(
            {
                'email': ['', EmailValidator.isValid],
                'userRole': ['', Validators.required]
            }
        );
        this.authData.getUserRole().subscribe(snapshot => {
            this.myUserRole = snapshot.$value;
        });
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateBranchPage Page');
    }

    inviteUserFormSubmit(){
        if (this.inviteOthersForm.valid){
            //invite user code here
            this.authData.newInvitation(this.inviteOthersForm.value.email, this.inviteOthersForm.value.userRole);
            this.navCtrl.pop();
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
