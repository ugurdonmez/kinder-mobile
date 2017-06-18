
import {Component, OnInit, Input} from '@angular/core';
import {AlertController} from "ionic-angular";
import moment from 'moment';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";
import {Camera} from "ionic-native";

@Component({
   selector: 'weekly-meal-menu-component',
   templateUrl: 'weekly-meal-menu-component.html',
   providers: []
})

export class WeeklyMealMenuComponent implements OnInit {
   private next15Weeks: any[] = [];
   private translate: TranslateService;
   @Input() classId: string;
   
   constructor(private alertCtrl: AlertController,
               public translator: Translator,
               public weeklyMealMenuProvider: WeeklyMealMenu,

   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      this.getNext15Weeks()
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

   private getNext15Weeks():void {
      let counter = 0
      this.next15Weeks = []
      while (counter < 15){
         this.next15Weeks.push([
            moment().day(1 + (counter*7)).valueOf(),
            moment().local().day(1 + (counter*7)).calendar() + ' - ' + moment().local().day(5 + (counter*7)).calendar()
         ])
         counter += 1;
      }
   }
}
