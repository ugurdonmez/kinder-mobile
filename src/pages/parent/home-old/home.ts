
import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
// import {TeacherChatPage} from "../teacher-chat/teacher-chat";

@Component({
   selector: 'page-parent-home',
   templateUrl: 'home.html',
})

export class ParentHomePageOld {

   constructor(public navCtrl: NavController,) {

   }

   // private openTeacherChatClicked(): void {
   //    this.navCtrl.push(TeacherChatPage)
   // }
}
