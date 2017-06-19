import {Component, OnInit, Input} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";
import {WeeklyMealMenuModel} from "../../models/weekly-meal-menu-model";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";

@Component({
   selector: 'view-weekly-meal-menu-component',
   templateUrl: 'view-weekly-meal-menu-component.html',
   providers: [Translator]
})


export class ViewWeeklyMealMenuComponent implements OnInit {
   @Input() weeklyMealMenu: WeeklyMealMenuModel;
   @Input() classId: string;
   @Input() role: string;
   private translate: TranslateService;

   constructor(private alertCtrl: AlertController,
               public navCtrl: NavController,
               public translator: Translator,
               public weeklyMealMenuProvider: WeeklyMealMenu,
   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      // console.log('ViewWeeklyMealMenuComponent ngOnInit weeklyMealMenu is:')
      // console.log(this.weeklyMealMenu)
      // console.log('ViewWeeklyMealMenuComponent ngOnInit classId is:')
      // console.log(this.classId)
   }

   private deleteWeeklyMealMenuClicked(){
      let prompt = this.alertCtrl.create({
         title: this.translate.instant('Delete Menu For This Week?'),
         buttons: [
            {
               text: this.translate.instant('Cancel'),
               handler: () => {
               }
            },
            {
               text: this.translate.instant('Delete'),
               handler: () => {
                  this.weeklyMealMenuProvider.deleteMenuImage(this.classId, this.weeklyMealMenu.date)
                  this.navCtrl.pop()
               }
            }
         ]
      });
      prompt.present();
   }
}
