import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-branch-admin-student',
   templateUrl: 'student.html'
})

export class BranchAdminStudentPage {

   private pageTitleTextEn: string = "Branch Admin Student Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

}