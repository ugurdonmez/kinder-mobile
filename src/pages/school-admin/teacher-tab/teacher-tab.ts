import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from "../../../providers/auth-data";

@Component({
   selector: 'page-school-admin-teacher-tab',
   templateUrl: 'teacher-tab.html'
})

export class SchoolAdminTeacherPage {


   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }

}
