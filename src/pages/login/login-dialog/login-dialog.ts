import {Component} from '@angular/core';

import {
   NavParams,
   ViewController,
   NavController,
   AlertController,
   LoadingController
} from 'ionic-angular';

import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from '@angular/forms';

import {Translator} from "../../../app/translator";
import {AuthData} from "../../../providers/auth-data";
import {EmailValidator} from "../../../validators/email";
import {SchoolAdminHomePage} from "../../branch-admin/home/home";


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
   // private login: LoginPage;
   private translate: TranslateService;

   constructor(public nav: NavController,
               public params: NavParams,
               public authData: AuthData,
               public translator: Translator,
               public alertCtrl: AlertController,
               public formBuilder: FormBuilder,
               public loadingCtrl: LoadingController,
               public viewCtrl: ViewController) {

      this.translate = translator.translatePipe;
      this.loginForm = formBuilder.group({
         email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

   }

   elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
   }

   dismiss(): void {
      this.viewCtrl.dismiss()
         .then(() => {
            // this.login.showLoginButton()
         });
   }

   loginUser(): void {
      this.submitAttempt = true;

      if (!this.loginForm.valid) {
         console.log(this.loginForm.value);
      } else {
         this.authData.loginUser(
            this.loginForm.value.email,
            this.loginForm.value.password)
            .then(() => {
               console.log('user id');
               console.log(this.authData.getUserId());

               this.redirectUser();
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

   private redirectUser(): void {
      this.authData.getUserRole()
         .subscribe(snapshot => {

            const role = snapshot.$value;

            this.loading.dismiss()

            if (role == 'branch-admin') {
               this.nav.setRoot(SchoolAdminHomePage)
                  .then(() => {
                     this.loading.dismiss()
                  })
            } else {
               this.nav.setRoot(SchoolAdminHomePage)
                  .then(() => {
                     this.loading.dismiss()
                  })
            }


               // if (role === 'branch-admin') {
               //    this.nav.setRoot(BranchAdminHomePage)
               // } else if (role === 'school-admin') {
               //    this.nav.setRoot(SchoolAdminHomePage)
               // } else if (role === 'teacher') {
               //    this.nav.setRoot(TeacherHomePage)
               // } else {
               //    this.nav.setRoot(ParentHomePage)
               // }
            }
         );
   }
}
