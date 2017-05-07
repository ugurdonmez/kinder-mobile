import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-branch-admin-class',
   templateUrl: 'class.html'
})

export class BranchAdminClassPage {

   private pageTitleTextEn: string = "Branch Admin Class Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

}
