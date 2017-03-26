import { Component } from '@angular/core';
import { Platform, NavParams, ViewController} from 'ionic-angular';

import { Translator } from "../../../app/translator";

// import {Translator} from "../../app/translator";

@Component({
   selector: 'login-dialog',
   templateUrl: 'login-dialog.html',
   providers: [Translator]
})

export class LoginDialog {

   constructor (
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController) {

   }

   dismiss() {
      this.viewCtrl.dismiss();
   }
}
