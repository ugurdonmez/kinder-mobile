
import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {NavParams} from "ionic-angular";
import {WeeklyActivityModel} from "../../../models/weekly-activity-model";

@Component({
   selector: 'page-teacher-view-weekly-activity',
   templateUrl: 'view-weekly-activity.html',
})

export class TeacherViewWeeklyActivityPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private weeklyActivity: WeeklyActivityModel;

   constructor(public translator: Translator,
               public navParams: NavParams,
   ) {
      this.translate = translator.translatePipe;
      this.classId = navParams.get('classId');
      this.weeklyActivity = navParams.get('weeklyActivity');
   }

   ngOnInit(): void {

   }
}
