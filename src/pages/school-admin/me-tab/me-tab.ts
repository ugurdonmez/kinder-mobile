import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-school-admin-me-tab',
   templateUrl: 'me-tab.html'
})

export class SchoolAdminMePage {

   private pageTitleTextEn: string = "School Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

   ionViewDidLoad() {

   }
}
