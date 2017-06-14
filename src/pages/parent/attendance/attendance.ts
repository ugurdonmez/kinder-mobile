

import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'teacher-attendance-page',
   templateUrl: 'attendance.html',
   providers: []
})

export class ParentAttendancePage implements OnInit {

   constructor() {

   }

   ngOnInit(): void {
      console.log('ParentAttendancePage: onInit()')
   }

}
