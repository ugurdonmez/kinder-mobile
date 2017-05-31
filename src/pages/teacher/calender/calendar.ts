
import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'teacher-calendar-page',
   templateUrl: 'calendar.html',
   providers: []
})

export class TeacherCalendarPage implements OnInit {

   constructor() {

   }

   ngOnInit(): void {
      console.log('TeacherCalendarPage: onInit()')
   }

}
