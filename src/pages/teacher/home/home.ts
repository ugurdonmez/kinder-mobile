
import {Component, OnInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {TeacherInboxPage} from "../inbox/inbox";
import {TeacherClassWallPage} from "../class-wall/class-wall";
import {TeacherCalendarPage} from "../calender/calendar";
import {TeacherGalleryPage} from "../gallery/gallery";
import {TeacherTakePhotoPage} from "../take-photo/take-photo";
import {AuthData} from "../../../providers/auth-data";
import {Classes} from "../../../providers/classes";
import {ClassModel} from "../../../models/class-model";
import {Schools} from "../../../providers/schools";
import {TeacherModel} from "../../../models/teacher-model";
import {Teachers} from "../../../providers/teachers";
import {SchoolModel} from "../../../models/school-model";
import {ParentModel} from "../../../models/parent-model";
import {Parents} from "../../../providers/parents";
import {TeacherParentPage} from "../teacher-parent/teacher-parent.page";
import {TeacherAttendancePage} from "../attendance/attendance";
import {TeacherWeeklyMealMenuPage} from "../weekly-meal-menu/weekly-meal-menu";
import {TeacherHomeworkPage} from "../homework/teacher-homework";

@Component({
   selector: 'page-teacher-home',
   templateUrl: 'home.html',
})

export class TeacherHomePage implements OnInit {

   private teacherId: string
   private teacher: TeacherModel
   private school: SchoolModel

   private schoolName: string
   private classLogoURL: string
   private className: string

   private selectedStudent: number

   private class: ClassModel
   private parents: Array<ParentModel>

   constructor(public navCtrl: NavController,
               public authData: AuthData,
               public classesProvider: Classes,
               public schoolProvider: Schools,
               public teacherProvider: Teachers,
               public parentProvider: Parents) {
   }

   ngOnInit(): void {
      this.selectedStudent = 0

      this.teacherId = this.authData.getUserId();

      console.log("teacher id")
      console.log(this.teacherId)

      this.classesProvider.getClassesOfTeacher(this.teacherId)
         .then(res => {
            this.class = res[0]
            console.log("classes of teacher:")
            console.log(this.class)

            this.className = this.class.name

            this.parentProvider.getParentsOfClass(this.class.id)
               .then(res => {
                  this.parents = res
                  console.log("parents of class:")
                  console.log(this.parents)
               })
         })

      this.teacherProvider.getTeacher(this.teacherId)
         .then(res => {
            this.teacher = res
            console.log("teacher model")
            console.log(this.teacher)

            this.schoolProvider.getSchool(this.teacher.schoolId)
               .then(res => {
                  this.school = res
                  console.log("school model")
                  console.log(this.school)
                  this.schoolName = this.school.name
                  this.classLogoURL = this.school.logoURL
               })
         })
   }

   private openInboxClicked(): void {
      this.navCtrl.push(TeacherInboxPage)
   }

   private openClassWallClicked(classId): void {
      console.log('opening class wall with class id:' + classId)
      this.navCtrl.push(TeacherClassWallPage, {classId: classId})
   }

   private selectStudent(p: number): void {
      console.log('select student')
      console.log(p)

      this.selectedStudent = p
   }

   private openCalendarClicked(): void {
      console.log('open calendar')

      let studentStr: string = JSON.stringify(this.parents[this.selectedStudent])

      this.navCtrl.push(TeacherCalendarPage, {studentStr})
   }

   private openGalleryClicked(): void {
      this.navCtrl.push(TeacherGalleryPage);
   }

   private openGWeeklyMealMenuClicked(): void {
      this.navCtrl.push(TeacherWeeklyMealMenuPage, {
         _class: this.class
      });
   }

   private openTakePhotoPageClicked(): void {
      this.navCtrl.push(TeacherTakePhotoPage, {classId: '-Ketn4qOsNQOA0vSjZRC'});
   }

   private openParentsPageClicked(): void {
      console.log('open parent page')

      let parent = this.parents[this.selectedStudent]

      let parentStr: string = JSON.stringify(parent)

      console.log('parent json')
      console.log(parentStr)

      this.navCtrl.push(TeacherParentPage, {parentStr})
   }

   private openAttendanceClicked(): void {
      console.log('open teacher attendance')

      let parentsStr: string = JSON.stringify(this.parents)
      console.log('parents json')
      console.log(parentsStr)

      let classStr: string = JSON.stringify(this.class)
      console.log('class str')
      console.log(classStr)

      this.navCtrl.push(TeacherAttendancePage, {parentsStr, classStr});
   }

   private openHomeworkClicked(): void {
      console.log('open teacher homework')

      let parentsStr: string = JSON.stringify(this.parents)
      console.log('parents json')
      console.log(parentsStr)

      let classStr: string = JSON.stringify(this.class)
      console.log('class str')
      console.log(classStr)

      this.navCtrl.push(TeacherHomeworkPage, {parentsStr, classStr});
   }
}
