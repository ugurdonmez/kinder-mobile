
import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'page-teacher-home',
   templateUrl: 'home.html',
})

export class TeacherHomePage implements OnInit {

   private schoolName: string
   private classLogoURL: string
   private className: string

   constructor() {

   }

   ngOnInit(): void {
      this.schoolName = 'school name'
      this.classLogoURL = 'url'
      this.className = 'class name'
   }
}
