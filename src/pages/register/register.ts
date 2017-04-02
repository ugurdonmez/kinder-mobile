import {
    NavController,
    LoadingController,
    AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { Translator } from "../../app/translator";
import { TranslateService } from "ng2-translate";


@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [Translator]
})

export class RegisterPage {

    public signupForm;
    emailChanged: boolean = false;
    passwordChanged: boolean = false;
    submitAttempt: boolean = false;
    loading;
    private translate: TranslateService;

    constructor(public nav: NavController, public authData: AuthData,
                public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
                public alertCtrl: AlertController, public translator: Translator) {
        this.translate = translator.translatePipe;

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    /**
    * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
    */
    elementChanged(input){
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }

    /**
    * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
    * component while the user waits.
    *
    * If the form is invalid it will just log the form value, feel free to handle that as you like.
    */
    // TODO: check
    signupUser(){
        this.submitAttempt = true;

        if (!this.signupForm.valid){
            console.log(this.signupForm.value);
        } else {

            // check that email is already saved in under database user table

            this.authData.signupUser(this.signupForm.value.email,
                this.signupForm.value.password).then(() => {
                    // this.nav.setRoot(HomePage);
                    this.authData.updateUserRoleFromInvitedUsers();
                }, (error) => {
                    this.loading.dismiss().then( () => {
                        var errorMessage: string = error.message;
                        let alert = this.alertCtrl.create({
                            message: errorMessage,
                            buttons: [{ text: this.translate.instant("Ok"),
                                role: this.translate.instant('Cancel') } ]
                        });

                        alert.present();
                    });
                });

            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });

            this.loading.present();

        }
    }
}
