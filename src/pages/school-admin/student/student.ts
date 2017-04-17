import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-school-admin-student',
   templateUrl: 'student.html'
})

export class SchoolAdminStudentPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }

}
