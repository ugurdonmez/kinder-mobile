import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
   selector: 'page-school-admin-class-tab',
   templateUrl: 'class-tab.html'
})

export class SchoolAdminClassPage {

   private pageTitleTextEn: string = "School Admin Class Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams) {

   }

}
