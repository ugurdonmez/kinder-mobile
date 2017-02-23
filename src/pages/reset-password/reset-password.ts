import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
// import { LoginPage } from '../login/login';
import { EmailValidator } from '../../validators/email';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";


@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
    providers: [Translator]
})
export class ResetPasswordPage {

    resetPasswordForm: any;
    emailChanged: boolean = false;
    passwordChanged: boolean = false;
    submitAttempt: boolean = false;
    private translate: TranslateService;


    constructor(public authData: AuthData, public formBuilder: FormBuilder,
                public nav: NavController, public alertCtrl: AlertController, public translator: Translator) {
        this.translate = translator.translatePipe;

        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,EmailValidator.isValid])]
        });
    }

    elementChanged(input){
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }


    resetPassword(){
        this.submitAttempt = true;

        if (!this.resetPasswordForm.valid){
            console.log(this.resetPasswordForm.value);
        } else {
            this.authData.resetPassword(this.resetPasswordForm.value.email)
            .then((user) => {
                let alert = this.alertCtrl.create({
                    message: this.translate.instant("We just sent you a reset link to your email"),
                    buttons: [{ text: this.translate.instant("Ok"), role: this.translate.instant('Cancel'),
                        handler: () => {
                            this.nav.pop();
                        }
                    }]
                });
            alert.present();
            }, (error) => {
                var errorMessage: string = error.message;
                let errorAlert = this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [{ text: this.translate.instant("Ok"), role: this.translate.instant('Cancel')}]
                });

                errorAlert.present();
            });
        }
    }

  ionViewDidLoad() {
    console.log('Hello ResetPasswordPage Page');
  }

}
