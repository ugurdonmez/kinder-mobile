import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-school-admin-student-tab',
   templateUrl: 'student-tab.html'
})

export class SchoolAdminStudentPage {

   private pageTitleTextEn: string = "School Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }

}
