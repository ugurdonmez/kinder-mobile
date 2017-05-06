import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from "../../../providers/auth-data";

@Component({
   selector: 'page-school-admin-teacher',
   templateUrl: 'teacher.html'
})

export class SchoolAdminTeacherPage {

   private pageTitleTextEn: string = "School Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }

}
