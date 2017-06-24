
import {Component, OnInit} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {NavParams} from "ionic-angular";
import {WeeklyMealMenuModel} from "../../../models/weekly-meal-menu-model";

@Component({
   selector: 'page-parent-view-weekly-meal-menu',
   templateUrl: 'view-weekly-meal-menu.html',
})

export class ParentViewWeeklyMealMenuPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private weeklyMealMenu: WeeklyMealMenuModel;

   constructor(public translator: Translator,
               public navParams: NavParams,
   ) {
      this.translate = translator.translatePipe;
      this.classId = navParams.get('classId');
      this.weeklyMealMenu = navParams.get('weeklyMealMenu');
   }

   ngOnInit(): void {

   }
}
