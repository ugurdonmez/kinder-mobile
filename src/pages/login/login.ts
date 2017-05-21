import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { TranslateService } from "ng2-translate";

import { Translator } from "../../app/translator";
import { LoginDialog } from "./login-dialog/login-dialog";

@Component({
   selector: 'page-login',
   templateUrl: 'login.html',
   providers: [Translator]
})


export class LoginPage {
   private translate: TranslateService;
   public dis:boolean = false;

   constructor(public translator: Translator,
               public modalCtrl: ModalController) {

      this.translate = translator.translatePipe;
   }

   ionViewDidLoad() {
      // console.log('ionViewDidLoad Login');
   }

   showLoginButton() {
      this.dis = false
   }


   openModal() {
      let modal = this.modalCtrl.create(LoginDialog);
      modal.present().then(() => {
         this.dis = true
      });
   }
}
