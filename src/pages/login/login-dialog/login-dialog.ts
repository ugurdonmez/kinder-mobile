import { Component } from '@angular/core';

import { Platform,
   NavParams,
   ViewController,
   NavController,
   AlertController,
   LoadingController } from 'ionic-angular';

import { TranslateService } from "ng2-translate";
import { FormBuilder, Validators } from '@angular/forms';

import { Translator } from "../../../app/translator";
import { AuthData } from "../../../providers/auth-data";
import { EmailValidator } from "../../../validators/email";
import { HomePage } from "../../home/home";

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.html',
   providers: [Translator]
})

export class LoginDialog {

   loginForm: any;
   emailChanged: boolean = false;
   passwordChanged: boolean = false;
   submitAttempt: boolean = false;
   loading: any;
   private translate: TranslateService;

   constructor (public nav: NavController,
                public platform: Platform,
                public params: NavParams,
                public authData: AuthData,
                public translator: Translator,
                public alertCtrl: AlertController,
                public formBuilder: FormBuilder,
                public loadingCtrl: LoadingController,
                public viewCtrl: ViewController) {

      this.translate = translator.translatePipe;
      this.loginForm = formBuilder.group({
         email:    ['', Validators.compose([Validators.required, EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

   }

   elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
   }

   dismiss() {
      this.viewCtrl.dismiss();
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
}
