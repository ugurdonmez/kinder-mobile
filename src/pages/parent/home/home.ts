
import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {ParentInboxPage} from "../inbox/inbox";
import {ParentClassWallPage} from "../class-wall/class-wall";
import {TeacherTakePhotoPage} from "../take-photo/take-photo";
import {AuthData} from "../../../providers/auth-data";
import {TeacherParentPage} from "../teacher-parent/teacher-parent.page";
import {ParentCalendarPage} from "../calender/calendar";
import {ParentGalleryPage} from "../gallery/gallery";
import {ParentAttendancePage} from "../attendance/attendance";

@Component({
   selector: 'page-teacher-home',
   templateUrl: 'home.html',
})

export class ParentHomePage implements OnInit {

   constructor(public navCtrl: NavController,
               public authData: AuthData) {
   }

   ngOnInit(): void {
      console.log("ParentHomePage: ngOnInit")
   }

   private openInboxClicked(): void {
      this.navCtrl.push(ParentInboxPage)
   }

   private openClassWallClicked(classId): void {
      console.log('opening class wall with class id:' + classId)
      this.navCtrl.push(ParentClassWallPage, {classId: classId})
   }

   private openCalendarClicked(): void {
      console.log('open calendar')

      // let studentStr: string = JSON.stringify(this.parents[this.selectedStudent])
      let studentStr: string = ""

      this.navCtrl.push(ParentCalendarPage, {studentStr})
   }

   private openGalleryClicked(): void {
      this.navCtrl.push(ParentGalleryPage);
   }

   private openAttendanceClicked(): void {
      this.navCtrl.push(ParentAttendancePage);
   }
}
