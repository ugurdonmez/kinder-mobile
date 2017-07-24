
import {Component, OnInit, Input} from '@angular/core';
import {AlertController, NavController} from "ionic-angular";
import moment from 'moment';
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {Camera} from "ionic-native";
import {ActivityModel} from "../../models/activity-model";
import {Activity} from "../../providers/activity";
import {WeeklyActivity} from "../../providers/weeklyactivity";
import {WeeklyActivityModel} from "../../models/weekly-activity-model";
import {TeacherViewWeeklyActivityPage} from "../../pages/teacher/view-weekly-activity/view-weekly-activity";

@Component({
   selector: 'weekly-activities-component',
   templateUrl: 'weekly-activities-component.html',
   providers: []
})

export class WeeklyActivitiesComponent implements OnInit {
   private next15Weeks: any[] = [];
   private translate: TranslateService;
   @Input() classId: string;
   private weeklyActivities: any;
   
   constructor(private alertCtrl: AlertController,
               public translator: Translator,
               private navCtrl: NavController,
               private weeklyActivityProvider: WeeklyActivity
   ) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
      this.getNext15Weeks()
      this.loadActivities()
   }

   addWeeklyActivityPhoto(){
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
            this.weeklyActivityProvider.addActivityImage(Camera.PictureSourceType.CAMERA, this.classId, data)
         }
      });
      alert.present();
   }

   private getActivityName(date){
      date = parseInt(date)
      let weekStart = moment(date).local().day(1).startOf('day').format('L')
      let weekEnd = moment(date).local().day(5).startOf('day').format('L')

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

   private loadActivities() {
      let counter = 0
      this.weeklyActivities = []
      while (counter < 15){
         this.weeklyActivities.push(
            this.weeklyActivityProvider.getActivityImage(
               this.classId,
               moment().day(1 + (counter*7)).startOf('day').valueOf().toString()
            )
         )
         counter += 1;
      }
   }

   private openWeeklyActivityPage(week: Promise<WeeklyActivityModel>){
      week.then(subscribedWeek => {
         if(!!subscribedWeek.imgUrl){
            this.navCtrl.push(TeacherViewWeeklyActivityPage, {
               classId: this.classId,
               weeklyActivity: subscribedWeek
            })
         }
      })
   }

   private takePhotoForWeek(week){
      // console.log('takePhotoForWeek week:')
      // console.log(week)
      week.then(subscribedWeek => {
         this.weeklyActivityProvider.addActivityImage(Camera.PictureSourceType.CAMERA, this.classId, subscribedWeek.date)
      })
   }
}
