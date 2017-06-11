
import {Component, OnInit} from '@angular/core';
import {StudentModel} from "../../../models/student-model";
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

   private students: Array<StudentModel>
   private class: ClassModel

   constructor(public navCtrl: NavController,
               public authData: AuthData,
               public classesProvider: Classes,
               public schoolProvider: Schools,
               public teacherProvider: Teachers) {
      this.students = []
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

      // this is fake now
      //this.schoolName = 'Muhittin Okullari'
      //this.classLogoURL = 'https://tr-static.eodev.com/files/ddd/0c7d58879d3fbd88329301579d3f91a1.jpg'
      //this.className = 'Ari Sinifi'

      // students
      let student1 = new StudentModel()

      student1.name = 'merve'
      student1.surname = 'donmez'
      student1.photo_url = 'http://c12.incisozluk.com.tr/res/incisozluk//11507/8/1020948_o563d.jpg'

      let student2 = new StudentModel()

      student2.name = 'sofia'
      student2.surname = 'donmez'
      student2.photo_url = 'http://c12.incisozluk.com.tr/res/incisozluk//11507/8/1020948_o563d.jpg'

      let student3 = new StudentModel()

      student3.name = 'anna'
      student3.surname = 'donmez'
      student3.photo_url = 'http://c12.incisozluk.com.tr/res/incisozluk//11507/8/1020948_o563d.jpg'

      this.students.push(student1)
      this.students.push(student2)
      this.students.push(student3)
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

      let studentStr: string = JSON.stringify(this.students[this.selectedStudent])

      this.navCtrl.push(TeacherCalendarPage, {studentStr})
   }

   private openGalleryClicked(): void {
      this.navCtrl.push(TeacherGalleryPage);
   }

   private openTakePhotoPageClicked(): void {
      this.navCtrl.push(TeacherTakePhotoPage, {classId: '-Ketn4qOsNQOA0vSjZRC'});
   }

}
