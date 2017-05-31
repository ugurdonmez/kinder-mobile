
import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'calendar-component',
   templateUrl: 'calendar-component.html',
   providers: []
})

export class CalendarComponent implements OnInit {

   constructor() {

   }

   ngOnInit(): void {
      console.log('Calendar Component: onInit()')
   }

}
