
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {StudentModel} from "../../models/student-model";

@Component({
   selector: 'calendar-component',
   templateUrl: 'calendar-component.html',
   providers: []
})

export class CalendarComponent implements OnInit {

   private student: StudentModel

   constructor(private navParams: NavParams) {

   }

   ngOnInit(): void {
      
      this.student = JSON.parse(this.navParams.get("studentStr"))

      console.log('Calendar Component: onInit()')
      console.log(this.student)
   }

}
