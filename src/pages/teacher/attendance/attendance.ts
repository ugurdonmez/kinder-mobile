

import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'teacher-attendance-page',
   templateUrl: 'attendance.html',
   providers: []
})

export class TeacherAttendancePage implements OnInit {

   constructor() {

   }

   ngOnInit(): void {
      console.log('TeacherAttendancePage: onInit()')
   }

}
