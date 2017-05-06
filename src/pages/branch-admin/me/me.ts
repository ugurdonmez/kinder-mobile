import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-branch-admin-me',
   templateUrl: 'me.html'
})

export class BranchAdminMePage {

   private pageTitleTextEn: string = "Branch Admin Me Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }
}
