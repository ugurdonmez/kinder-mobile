import {Component, OnInit, Input} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";
import {WeeklyMealMenuModel} from "../../models/weekly-meal-menu-model";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";
import {WeeklyActivityModel} from "../../models/weekly-activity-model";
import {WeeklyActivity} from "../../providers/weeklyactivity";

@Component({
   selector: 'parent-view-weekly-activity-component',
   templateUrl: 'parent-view-weekly-activity-component.html',
   providers: [Translator]
})


export class ParentViewWeeklyActivityComponent implements OnInit {
   @Input() weeklyActivity: WeeklyActivityModel;
   @Input() classId: string;
   @Input() role: string;
   private translate: TranslateService;

   constructor(
               public navCtrl: NavController,
               public translator: Translator,
   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
   }
}
