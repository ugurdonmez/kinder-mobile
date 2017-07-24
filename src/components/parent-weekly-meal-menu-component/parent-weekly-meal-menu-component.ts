
import {Component, OnInit, Input} from '@angular/core';
import {AlertController, NavController} from "ionic-angular";
import moment from 'moment';
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";
import {WeeklyMealMenuModel} from "../../models/weekly-meal-menu-model";
import {ParentViewWeeklyMealMenuPage} from "../../pages/parent/view-weekly-meal-menu/view-weekly-meal-menu";

@Component({
   selector: 'parent-weekly-meal-menu-component',
   templateUrl: 'parent-weekly-meal-menu-component.html',
   providers: []
})

export class ParentWeeklyMealMenuComponent implements OnInit {
   private next15Weeks: any[] = [];
   private translate: TranslateService;
   @Input() classId: string;
   private weeklyMeals: any;
   
   constructor(private alertCtrl: AlertController,
               public translator: Translator,
               public weeklyMealMenuProvider: WeeklyMealMenu,
               private navCtrl: NavController,
   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      this.getNext15Weeks()
      this.loadWeeklyMeals()
   }

   private getMealName(mealDate){
      mealDate = parseInt(mealDate)
      let weekStart = moment(mealDate).local().day(1).startOf('day').format('L')
      let weekEnd = moment(mealDate).local().day(5).startOf('day').format('L')

      return weekStart + ' - ' + weekEnd
   }

   private getNext15Weeks():void {
      let counter = 0
      this.next15Weeks = []
      while (counter < 15){
         this.next15Weeks.push([
            moment().day(1 + (counter*7)).startOf('day').valueOf(),
            moment().local().day(1 + (counter*7)).startOf('day').format('L') +
            ' - ' +
            moment().local().day(5 + (counter*7)).startOf('day').format('L')
         ])
         counter += 1;
      }
   }

   private loadWeeklyMeals() {
      let counter = 0
      this.weeklyMeals = []
      while (counter < 15){
         this.weeklyMeals.push(
            this.weeklyMealMenuProvider.getMenuImage(
               this.classId,
               moment().day(1 + (counter*7)).startOf('day').valueOf().toString()
            )
         )
         counter += 1;
      }
   }

   private openWeeklyMealPage(week: Promise<WeeklyMealMenuModel>){
      week.then(subscribedWeek => {
         if(!!subscribedWeek.imgUrl){
            this.navCtrl.push(ParentViewWeeklyMealMenuPage, {
               classId: this.classId,
               weeklyMealMenu: subscribedWeek
            })
         }
      })
   }
}
