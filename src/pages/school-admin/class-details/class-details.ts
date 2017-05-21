import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ClassModel} from "../../../models/class-model";
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
   selector: 'page-school-admin-class-details',
   templateUrl: 'class-details.html'
})

export class SchoolAdminClassDetailsPage {

   private translate: TranslateService;
   private _class: ClassModel;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator) {
      this.translate = translator.translatePipe;
      this._class = this.navParams.get('class');
   }

   ionViewDidLoad() {

   }
}
