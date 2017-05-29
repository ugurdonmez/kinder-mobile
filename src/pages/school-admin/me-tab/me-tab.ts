import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from "../../../providers/auth-data";
import {Schools} from "../../../providers/schools";
import {SchoolModel} from "../../../models/school-model";

@Component({
   selector: 'page-school-admin-me-tab',
   templateUrl: 'me-tab.html'
})

export class SchoolAdminMePage {
   private school: SchoolModel;

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private schoolsProvider: Schools) {
      // console.log('school admin me tab called')

      this.schoolsProvider.getSchoolBySchoolAdminId().then( schools => {
         this.school = schools[0]
         // console.log('school admin me tab, school:')
         // console.log(this.school)
      })
   }

   ionViewDidLoad() {

   }
}
