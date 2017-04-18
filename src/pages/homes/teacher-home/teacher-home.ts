import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from "../../../providers/auth-data";
import {MessagePage} from "../../message/message";
import {SchoolAdminClassesPage} from "../../school-admin-classes/school-admin-classes";
import {Translator} from "../../../app/translator";
import {Schools} from "../../../providers/schools";
import {Teachers} from "../../../providers/teachers";
import {SchoolAdminAddUpdateTeacherPage} from "../../school-admin-add-update-teacher/school-admin-add-update-teacher";


@Component({
  selector: 'page-teacher-home',
  templateUrl: 'teacher-home.html',
    providers: [Translator, Schools, Teachers]
})
export class TeacherHomePage {
    private userSchoolId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translator: Translator,
              public authData: AuthData,
              private teachersProvider: Teachers) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherHomePage');
  }

    private openMessages(){
        this.navCtrl.push(MessagePage)
    }

    private openMySchool(): any{
        this.navCtrl.push(SchoolAdminClassesPage, {'schoolId': this.userSchoolId});
    }

    private teacherCheck() {
        // console.log("my user role:");
        // console.log(this.myUserRole);
        let thisTeacher = this.teachersProvider.getTeacher(this.authData.getUserId());
        thisTeacher.subscribe( teacherSnapshot => {
            // console.log("teacher object snapshot:");
            // console.log(teacherSnapshot);
            // console.log(teacherSnapshot.$value === null);
            if(teacherSnapshot.$value === null){
                this.directTeacherToCreateTeacherPage();
            }
            else{
                this.directTeacherToSchoolPage();
            }
        })
    }

    private directTeacherToCreateTeacherPage() {
        this.authData.getUser().subscribe(thisUser => {
            // console.log("user snapshot:")
            // console.log(thisUser)
            this.navCtrl.setRoot(SchoolAdminAddUpdateTeacherPage, {
                'schoolId': thisUser.schoolId
            })
        })
    }

    private directTeacherToSchoolPage() {
        this.authData.getUser().subscribe(thisUser => {
            // console.log("user snapshot:")
            // console.log(thisUser)
            this.userSchoolId = thisUser.schoolId;
        })
    }

}
