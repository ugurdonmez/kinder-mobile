import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {SchoolModel} from "../../../models/school-model";
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";

@Component({
   selector: 'page-branch-admin-school-details',
   templateUrl: 'school-details.html'
})

export class BranchAdminSchoolDetailsPage {

   private school: SchoolModel;
   private translate: TranslateService;

   constructor(public navParams: NavParams,
               public translator: Translator) {
      this.translate = translator.translatePipe;
      this.school = this.navParams.get('school');
   }

   ionViewDidLoad() {

   }
}
