import {
    NavController,
    LoadingController,
    AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";


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
    signupUser(){
        this.submitAttempt = true;

        if (!this.signupForm.valid){
            console.log(this.signupForm.value);
        } else {

            // check that email is already saved in under database user table

            this.authData.signupUser(this.signupForm.value.email,
                this.signupForm.value.password).then(() => {
                    this.nav.setRoot(HomePage);
                }, (error) => {
                    this.loading.dismiss().then( () => {
                        var errorMessage: string = error.message;
                        let alert = this.alertCtrl.create({
                            message: errorMessage,
                            buttons: [{ text: "Ok", role: 'cancel' } ]
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


    /*

    createSuccess = false;
    registerCredentials = {email: '', password: ''};

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}

    public register() {
        this.auth.register(this.registerCredentials).subscribe(success => {
            if (success) {
                this.createSuccess = true;
                this.showPopup("Success", "Account created.");
            } else {
                this.showPopup("Error", "Problem creating account.");
            }
        },
        error => {
            this.showPopup("Error", error);
        });
    }

    showPopup(title, text) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.nav.popToRoot();
                        }
                    }
                }
            ]
        });

        alert.present();
    }

    */
}
