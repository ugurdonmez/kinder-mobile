
import {Component, OnInit} from '@angular/core';
import {StudentModel} from "../../../models/student-model";

@Component({
   selector: 'page-teacher-messages',
   templateUrl: 'messages.html',
})

export class TeacherMessagesPage implements OnInit {

   private schoolName: string
   private classLogoURL: string
   private className: string

   private students: Array<StudentModel>

   constructor() {
      this.students = []
   }

   ngOnInit(): void {

      // this is fake now
      this.schoolName = 'Muhittin Okullari'
      this.classLogoURL = 'https://tr-static.eodev.com/files/ddd/0c7d58879d3fbd88329301579d3f91a1.jpg'
      this.className = 'Ari Sinifi'

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

      this.messageTests()
   }

   private messageTests() {

   }
}
