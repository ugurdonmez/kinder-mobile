import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Schools} from '../../providers/schools'
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {Classes} from "../../providers/classes";
import { SchoolAdminAddUpdateClassPage } from '../school-admin-add-update-class/school-admin-add-update-class';
import {Teachers} from "../../providers/teachers";
import {SchoolAdminEditSchoolPage} from "../school-admin-edit-school/school-admin-edit-school";
import {SchoolAdminClassDetailsPage} from "../school-admin-class-details/school-admin-class-details";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {HomePage} from "../home/home";
import {AuthData} from "../../providers/auth-data";
import {InviteOthersPage} from "../invite-others/invite-others";

@Component({
  selector: 'page-school-admin-classes',
  templateUrl: 'school-admin-classes.html',
    providers: [Schools, Classes, Teachers, Translator]
})


export class SchoolAdminClassesPage {
    private schoolId: string;
    private school: FirebaseObjectObservable<any>;
    private translate: TranslateService;
    private logoURL: string;
    private myUserRole: string;
    private listedClasses: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, public schoolsProvider: Schools, public classesProvider: Classes,
                private navParams: NavParams, private teachersProvider: Teachers, public translator: Translator,
                public authData: AuthData) {
        this.translate = translator.translatePipe;
        this.schoolId = navParams.get('schoolId');
        this.school = schoolsProvider.getSchool(this.schoolId);
        this.loadImage();
        this.loadUserRoleAndUsersClasses();
        this.school.subscribe(snapshot => { // return home if school doesn't exist.
            if(snapshot === null){
                console.log(snapshot === null);
                this.navCtrl.setRoot(HomePage);
            }
        });
    }

    private loadUserRoleAndUsersClasses() {
        this.authData.getUser().subscribe(snapshot => {
            this.myUserRole = snapshot.role;
            if (this.myUserRole == 'developer'
                || this.myUserRole == 'branch-admin'
                || this.myUserRole == 'school-admin'){
                this.listedClasses = this.classesProvider.getClassesOfSchool(this.schoolId);
            }
            else if(this.myUserRole == 'teacher'){
                // TODO after teacher inv + profile creation works
            }
        });
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminClassesPage Page');
    }

    openClassPage(classId){
        // console.log('goes to class list of that school with classId:' + classId);
        this.navCtrl.push(SchoolAdminClassDetailsPage, {'classId': classId})
    }

    openSchoolAdminClassAdd() {
        console.log('adds new class to school with schoolId: ' + this.schoolId);
        this.navCtrl.push( SchoolAdminAddUpdateClassPage  , {'schoolId':this.schoolId});
    }
    getTeacher(teacherId){
        console.log("requested teacher entity with teacherId:"+teacherId);
        let teacher = this.teachersProvider.getTeacher(teacherId);
        console.log(teacher);
        return teacher;
    }

    openSchoolAdminEditSchoolPage(schoolId: string){
        this.navCtrl.push( SchoolAdminEditSchoolPage , {'schoolId':this.schoolId});
    }

    loadImage(){
        this.school.subscribe(snapshot => {
            this.logoURL = snapshot.logoURL;
            console.log(this.logoURL);
        })
    }

    openAddTeacher(){
        this.navCtrl.push( InviteOthersPage , {
            'sourcePage': 'SchoolPage',
            'schoolId':this.schoolId,
            'invitationRole':'teacher'
        });
    }
}
