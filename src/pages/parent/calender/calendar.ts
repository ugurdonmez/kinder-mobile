
import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'teacher-calendar-page',
   templateUrl: 'calendar.html',
   providers: []
})

export class ParentCalendarPage implements OnInit {

   constructor() {

   }

   ngOnInit(): void {
      console.log('ParentCalendarPage: onInit()')
   }

}
