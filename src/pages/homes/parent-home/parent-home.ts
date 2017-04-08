import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthData} from "../../../providers/auth-data";
import {Translator} from "../../../app/translator";
import {Parents} from "../../../providers/parents";
import {AddParentPage} from "../../add-parent/add-parent";
import {SchoolAdminClassDetailsPage} from "../../school-admin-class-details/school-admin-class-details";
import {WeeklyActivityPlanPage} from "../../weekly-activity-plan/weekly-activity-plan";
import {DailyParentFeedbackPage} from "../../daily-parent-feedback/daily-parent-feedback";
import {AttendancePage} from "../../attendance/attendance";
import {GalleryPage} from "../../gallery/gallery";
import {WeeklyMenuPage} from "../../weekly-menu/weekly-menu";
import {DailyTeacherFeedbackPage} from "../../daily-teacher-feedback/daily-teacher-feedback";
import {HomeworksPage} from "../../homeworks/homeworks";
import {MessagePage} from "../../message/message";
import {CalenderPage} from "../../calender/calender";

@Component({
   selector: 'page-parent-home',
   templateUrl: 'parent-home.html',
   providers: [Translator, Parents]
})
export class ParentHomePage {
   private userClassId: string;
   private pageTitleTextEn: string = "Parent Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator,
               public authData: AuthData,
               private parentsProvider: Parents) {
      this.parentCheck();
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ParentHomePage');
   }

   private parentCheck() {
      let thisParent = this.parentsProvider.getParent(this.authData.getUserId());
      thisParent.subscribe(parentSnapshot => {
         console.log("parent object snapshot:");
         console.log(parentSnapshot);
         console.log(parentSnapshot.$value === null);
         if (parentSnapshot.$value === null) {
            this.directToCreateParentPage();
         }
         else {
            this.directParentToClassPage();
         }
      })
   }

   private directToCreateParentPage() {
      this.authData.getUser()
         .subscribe(thisUser => {
            this.navCtrl.setRoot(AddParentPage, {
               'classId': thisUser.classId
            })
         })
   }

   private directParentToClassPage() {
      this.authData.getUser()
         .subscribe(thisUser => {
            console.log("opening class details page for parent with object:");
            console.log(thisUser);
            this.userClassId = thisUser.classId;
         })
   }

   private openMyClass(): any {
      this.navCtrl.push(SchoolAdminClassDetailsPage, {'classId': this.userClassId});
   }

   private openDailyTeacherFeedbackPage() {
      this.navCtrl.push(DailyTeacherFeedbackPage);
   }

   private openHomeworkPage() {
      this.navCtrl.push(HomeworksPage);
   }

   private openMessages() {
      this.navCtrl.push(MessagePage)
   }

   openCalender() {
      this.navCtrl.push(CalenderPage);
   }

   openWeeklyMenu() {
      this.navCtrl.push(WeeklyMenuPage);
   }

   openGallery() {
      this.navCtrl.push(GalleryPage);
   }

   openActivityPlan() {
      this.navCtrl.push(WeeklyActivityPlanPage);
   }

   openDailyParentFeedbackPage() {
      this.navCtrl.push(DailyParentFeedbackPage);
   }

   openAttendancePage() {
      this.navCtrl.push(AttendancePage);
   }
}
