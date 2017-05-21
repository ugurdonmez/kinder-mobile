import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {SchoolModel} from "../../../models/school-model";
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
   selector: 'page-branch-admin-create-class',
   templateUrl: 'create-class.html'
})

export class BranchAdminCreateClassPage {

   private school: SchoolModel;
   private translate: TranslateService;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator,
               public alertCtrl: AlertController) {
      this.school = this.navParams.get('school');
   }

   ionViewDidLoad() {

   }

}
