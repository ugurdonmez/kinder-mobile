
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
import {Parents} from "../../../providers/parents";
import {Classes} from "../../../providers/classes";
import {ParentModel} from "../../../models/parent-model";
import {ParentWeeklyActivitiesPage} from "../weekly-activities/weekly-activities";
import {ClassModel} from "../../../models/class-model";
import {ParentWeeklyMealMenuPage} from "../weekly-meal-menu/weekly-meal-menu";
import {ParentHomeworkPage} from "../homework/parent-homework";

@Component({
   selector: 'page-teacher-home',
   templateUrl: 'home.html',
})

export class ParentHomePage implements OnInit {
   private class: ClassModel;
   private userId: string;
   private parent: ParentModel;
   constructor(public navCtrl: NavController,
               public authData: AuthData,
               private parentProvider: Parents,
               private classProvider: Classes,
   ) {
      this.userId = this.authData.getUserId();
      this.parentProvider.getParent(this.userId).then(parent => {
         this.parent = parent
         this.classProvider.getClass(this.parent.classId).then(_class => {
            this.class = _class;
         })
      })
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

   private openWeeklyActivityPlanClicked(): void {
      this.navCtrl.push(ParentWeeklyActivitiesPage, {
         _class: this.class
      });
   }

   private openWeeklyMealMenuClicked(): void {
      this.navCtrl.push(ParentWeeklyMealMenuPage, {
         _class: this.class
      });
   }

   private openCalendarClicked(): void {
      console.log('open calendar')

      // let studentStr: string = JSON.stringify(this.parents[this.selectedStudent])
      let studentStr: string = "{}"

      this.navCtrl.push(ParentCalendarPage, {studentStr})
   }

   private openGalleryClicked(): void {
      this.navCtrl.push(ParentGalleryPage);
   }

   private openAttendanceClicked(): void {
      this.navCtrl.push(ParentAttendancePage);
   }

   private openHomeworkClicked(): void {
      // let parentsStr: string = JSON.stringify(this.parents)
      // console.log('parents json')
      // console.log(parentsStr)
      //
      // let classStr: string = JSON.stringify(this.class)
      // console.log('class str')
      // console.log(classStr)

      this.navCtrl.push(ParentHomeworkPage, {parent:this.parent, _class:this.class});
   }
}
