
import {Component, OnInit, Input} from '@angular/core';
import {AlertController} from "ionic-angular";
import moment from 'moment';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";
import {Camera} from "ionic-native";
import {WeeklyMealMenuModel} from "../../models/weekly-meal-menu-model";

@Component({
   selector: 'weekly-meal-menu-component',
   templateUrl: 'weekly-meal-menu-component.html',
   providers: []
})

export class WeeklyMealMenuComponent implements OnInit {
   private next15Weeks: any[] = [];
   private translate: TranslateService;
   @Input() classId: string;
   private weeklyMeals: any;
   
   constructor(private alertCtrl: AlertController,
               public translator: Translator,
               public weeklyMealMenuProvider: WeeklyMealMenu,

   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      this.getNext15Weeks()
      this.loadWeeklyMeals()
   }

   addWeeklyMenuPhoto(){
      let alert = this.alertCtrl.create();
      alert.setTitle(this.translate.instant('Select date:'));

      this.next15Weeks.forEach((week) => {
         alert.addInput({
            type: 'checkbox',
            label: week[1],
            value: week[0],
            checked: false
         });
      })

      alert.addButton('Cancel');
      alert.addButton({
         text: 'Okay',
         handler: data => {
            console.log('Checkbox data:', data);
            this.weeklyMealMenuProvider.addMenuImage(Camera.PictureSourceType.CAMERA, this.classId, data)
         }
      });
      alert.present();
   }

   private getMealName(mealDate){
      console.log('getMealName(mealDate: ')
      console.log(mealDate)
      mealDate = parseInt(mealDate)
      console.log('getMealName week start for this date: ')
      let weekStart = moment(mealDate).local().day(1).startOf('day').format('L')
      console.log(weekStart)
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
      week.then(subs => {
         console.log('openWeeklyMealPage load:')
         console.log(subs)
      })
   }
}
