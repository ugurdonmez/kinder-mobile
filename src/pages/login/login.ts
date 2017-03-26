import {Component} from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

import {FormBuilder, Validators} from '@angular/forms';
import {AuthData} from '../../providers/auth-data';

import {ResetPasswordPage} from '../reset-password/reset-password';

import {EmailValidator} from '../../validators/email';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import { LoginDialog } from "./login-dialog/login-dialog";

@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
   providers: [Translator]
})


export class LoginPage {

   loginForm: any;
   emailChanged: boolean = false;
   passwordChanged: boolean = false;
   submitAttempt: boolean = false;
   loading: any;
   private translate: TranslateService;

   constructor(public nav: NavController,
               public authData: AuthData,
               public formBuilder: FormBuilder,
               public alertCtrl: AlertController,
               public loadingCtrl: LoadingController,
               public translator: Translator,
               public modalCtrl: ModalController) {

      this.translate = translator.translatePipe;
      this.loginForm = formBuilder.group({
         email: ['', Validators.compose([Validators.required,
            EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

   }

   goToResetPassword() {
      this.nav.push(ResetPasswordPage);
   }

   createAccount() {
      this.nav.push(RegisterPage);
   }

   elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
   }

   loginUser() {
      this.submitAttempt = true;

      if (!this.loginForm.valid) {
         console.log(this.loginForm.value);
      } else {
         this.authData.loginUser(this.loginForm.value.email,
            this.loginForm.value.password)
            .then(authData => {
               this.nav.setRoot(HomePage);
            }, error => {
               this.loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                     message: error.message,
                     buttons: [
                        {
                           text: this.translate.instant("Ok"),
                           role: this.translate.instant('Cancel')
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

   openModal() {

      let modal = this.modalCtrl.create(LoginDialog);
      modal.present();
   }
}

/*
@Component({
   template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Description
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <ion-avatar item-left>
          <img src="{{character.image}}">
        </ion-avatar>
        <h2>{{character.name}}</h2>
        <p>{{character.quote}}</p>
      </ion-item>
      <ion-item *ngFor="let item of character['items']">
        {{item.title}}
        <ion-note item-right>
          {{item.note}}
        </ion-note>
      </ion-item>
  </ion-list>
</ion-content>
`
})

export class ModalContentPage {
   character;

   constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
   ) {
      var characters = [
         {
            name: 'Gollum',
            quote: 'Sneaky little hobbitses!',
            image: 'assets/img/avatar-gollum.jpg',
            items: [
               { title: 'Race', note: 'Hobbit' },
               { title: 'Culture', note: 'River Folk' },
               { title: 'Alter Ego', note: 'Smeagol' }
            ]
         },
         {
            name: 'Frodo',
            quote: 'Go back, Sam! I\'m going to Mordor alone!',
            image: 'assets/img/avatar-frodo.jpg',
            items: [
               { title: 'Race', note: 'Hobbit' },
               { title: 'Culture', note: 'Shire Folk' },
               { title: 'Weapon', note: 'Sting' }
            ]
         },
         {
            name: 'Samwise Gamgee',
            quote: 'What we need is a few good taters.',
            image: 'assets/img/avatar-samwise.jpg',
            items: [
               { title: 'Race', note: 'Hobbit' },
               { title: 'Culture', note: 'Shire Folk' },
               { title: 'Nickname', note: 'Sam' }
            ]
         }
      ];
      this.character = characters[this.params.get('charNum')];
   }

   dismiss() {
      this.viewCtrl.dismiss();
   }
}
*/
