import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-branch-admin-teacher',
   templateUrl: 'teacher.html'
})

export class BranchAdminTeacherPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }

}