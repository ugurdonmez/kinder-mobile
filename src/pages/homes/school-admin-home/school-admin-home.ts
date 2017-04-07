import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from "../../../providers/auth-data";
import {Schools} from "../../../providers/schools";
import {SchoolAdminAddUpdateSchoolPage} from "../../school-admin-add-update-school/school-admin-add-update-school";
import {SchoolAdminClassesPage} from "../../school-admin-classes/school-admin-classes";
import {Translator} from "../../../app/translator";
import {MessagePage} from "../../message/message";


@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'school-admin-home.html',
   providers: [Translator, Schools]
})

export class SchoolAdminHomePage {
   private doesUserHasSchool: boolean;
   private userSchoolId: string;
   private pageTitleTextEn: string = "School Admin Home Page";

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public translator: Translator,
               public authData: AuthData,
               private schoolsProvider: Schools) {


      this.loadDoesUserHasSchool();

   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad SchoolAdminHomePage');
   }

   private loadDoesUserHasSchool() {
      this.schoolsProvider.getUserSchools().subscribe(snapshot => {
         if (snapshot.length > 0){
            this.doesUserHasSchool = (snapshot.length > 0);
            console.log("user has school.");
            this.userSchoolId = snapshot[0].$key;
         }
         else{
            this.doesUserHasSchool = (snapshot.length > 0);
            console.log("user has no school.")
         }
      })
   }

   private openMySchool(): any{
      this.navCtrl.push(SchoolAdminClassesPage, {'schoolId': this.userSchoolId});
   }

   private createMySchool(){
      this.authData.getUser().subscribe(snapshot => {
         this.navCtrl.push(SchoolAdminAddUpdateSchoolPage, {'branchId': snapshot.branchId});
      })
   }

   private openMessages(){
      this.navCtrl.push(MessagePage)
   }
}
