import {Component, OnInit, Input} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {WeeklyMealMenuModel} from "../../models/weekly-meal-menu-model";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";

@Component({
   selector: 'parent-view-weekly-meal-menu-component',
   templateUrl: 'parent-view-weekly-meal-menu-component.html',
   providers: [Translator]
})


export class ParentViewWeeklyMealMenuComponent implements OnInit {
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
   }
}
