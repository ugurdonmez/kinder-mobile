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
   selector: 'view-weekly-activity-component',
   templateUrl: 'view-weekly-activity-component.html',
   providers: [Translator]
})


export class ViewWeeklyActivityComponent implements OnInit {
   @Input() weeklyActivity: WeeklyActivityModel;
   @Input() classId: string;
   @Input() role: string;
   private translate: TranslateService;

   constructor(private alertCtrl: AlertController,
               public navCtrl: NavController,
               public translator: Translator,
               private weeklyActivityProvider: WeeklyActivity
   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
   }

   private deleteWeeklyActivityClicked(){
      let prompt = this.alertCtrl.create({
         title: this.translate.instant('Delete Activity For This Week?'),
         buttons: [
            {
               text: this.translate.instant('Cancel'),
               handler: () => {
               }
            },
            {
               text: this.translate.instant('Delete'),
               handler: () => {
                  this.weeklyActivityProvider.deleteActivityImage(this.classId, this.weeklyActivity.date)
                  this.navCtrl.pop()
               }
            }
         ]
      });
      prompt.present();
   }
}
