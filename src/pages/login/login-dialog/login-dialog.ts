import {Component} from '@angular/core';

import {
   Platform,
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
import {BranchAdminHomePage} from "../../homes/branch-admin-home/branch-admin-home";
import {TeacherHomePage} from "../../homes/teacher-home/teacher-home";
import {ParentHomePage} from "../../homes/parent-home/parent-home";
import {SchoolAdminHomePage} from "../../homes/school-admin-home/school-admin-home";


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

   constructor(public nav: NavController,
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
         email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
         password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

   }

   elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
   }

   dismiss(): void {
      this.viewCtrl.dismiss();
   }

   loginUser(): void {
      this.submitAttempt = true;

      if (!this.loginForm.valid) {
         console.log(this.loginForm.value);
      } else {
         this.authData.loginUser(
            this.loginForm.value.email,
            this.loginForm.value.password)
            .then( x => {
               console.log('user id');
               console.log(this.authData.getUserId());
               console.log('auth data')
               console.log(x)

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
               console.log('user role snapshot');
               console.log(snapshot.$key);
               console.log(snapshot.$value);

               const role = snapshot.$value;

               this.loading.dismiss()

               if (role === 'branch-admin') {
                  this.nav.setRoot(BranchAdminHomePage)
               } else if (role === 'school-admin') {
                  this.nav.setRoot(SchoolAdminHomePage)
               } else if (role === 'teacher') {
                  this.nav.setRoot(TeacherHomePage)
               } else {

                  this.nav.setRoot(ParentHomePage)
               }
            }
         );
   }
}
