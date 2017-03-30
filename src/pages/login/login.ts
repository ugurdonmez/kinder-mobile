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

   constructor(public translator: Translator,
               public modalCtrl: ModalController) {

      this.translate = translator.translatePipe;
   }

   openModal() {
      let modal = this.modalCtrl.create(LoginDialog);
      modal.present();
   }

}
