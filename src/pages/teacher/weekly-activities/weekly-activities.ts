
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {ClassModel} from "../../../models/class-model";

@Component({
   selector: 'teacher-weekly-activities-page',
   templateUrl: 'weekly-activities.html',
   providers: []
})

export class TeacherWeeklyActivitiesPage implements OnInit {
   private _class: ClassModel;

   constructor(
      private navParams: NavParams,
   ) {
      this._class = navParams.get('_class');
   }

   ngOnInit(): void {
   }

}
