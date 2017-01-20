import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
// import { Loading } from 'ionic-angular';
// import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

import { ResetPasswordPage } from '../reset-password/reset-password';

import { EmailValidator } from '../../validators/email';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})


export class LoginPage {

    loginForm: any;
    emailChanged: boolean = false;
    passwordChanged: boolean = false;
    submitAttempt: boolean = false;
    loading: any;

    constructor(public nav: NavController, public authData: AuthData,
                public formBuilder: FormBuilder, public alertCtrl: AlertController,
                public loadingCtrl: LoadingController) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,
                                            EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6),Validators.required])]
        });

    }

    goToResetPassword(){
        this.nav.push(ResetPasswordPage);
    }

    createAccount(){
        this.nav.push(RegisterPage);
    }

    elementChanged(input){
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }

    loginUser(){
        this.submitAttempt = true;

        if (!this.loginForm.valid){
            console.log(this.loginForm.value);
        } else {
            this.authData.loginUser(this.loginForm.value.email,
                                    this.loginForm.value.password)
                .then( authData => {
                    this.nav.setRoot(HomePage);
                }, error => {
                    this.loading.dismiss().then( () => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
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

    loading: Loading;
    registerCredentials = {email: '', password: ''};

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

    ionViewDidLoad() {
        console.log('Hello LoginPage Page');
    }

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public login() {
        this.showLoading();

        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed) {
                setTimeout(() => {
                    this.loading.dismiss();
                    this.nav.setRoot(HomePage)
                });
            } else {
                this.showError("Access Denied");
            }
        },
        error => {
            this.showError(error);
        });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }


    showError(text) {
        setTimeout(() => {
            this.loading.dismiss();
        });

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    */


}
