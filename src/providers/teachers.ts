import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {TeacherModel} from '../models/teacher-model';
import { AuthData } from './auth-data';

import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";
import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "ng2-translate";
import {Schools} from "./schools";
import {SchoolModel} from "../models/school-model";

@Injectable()
export class Teachers {

    teachers: any;
    private translate: TranslateService;

    constructor(public af: AngularFire, public authData: AuthData, private alertCtrl: AlertController,
                public translator: Translator, private schoolProvider: Schools){
        this.teachers = af.database.list('/teachers');
        this.translate = translator.translatePipe;
    }

    public getTeacherByBranchAdminId() : Promise<TeacherModel[]> {
       var userId = this.authData.getUserId();

       return this.af.database
          .list('/teachers', {
             query: {
                orderByChild: 'branchAdminId',
                equalTo: userId
             }
          })
          .map(this.castListToModel)
          .first()
          .toPromise()
    }

    public getTeacherBySchoolAdminId() : Promise<TeacherModel[]> {
       var userId = this.authData.getUserId();

       return this.af.database
          .list('/teachers', {
             query: {
                orderByChild: 'schoolAdminId',
                equalTo: userId
             }
          })
          .map(this.castListToModel)
          .first()
          .toPromise()
    }

    public getTeacher(teacherId: string):Promise<TeacherModel> {
        return this.af.database.object('/teachers/' + teacherId)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

    public getAllTeachers():Promise<TeacherModel[]> {
        return this.af.database.list('/teachers/')
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    public addTeacher(teacher: TeacherModel) {
        return this.teachers.push(teacher).key;
    }

    public registerThisUserAsTeacher(teacher: TeacherModel){
        let userId = this.authData.getUserId();
        this.af.database.object('/teachers/'+userId).set(teacher);
        return userId;
    }

    deleteTeacher(teacherId: string){
        this.af.database.object('/teachers/' + teacherId).remove();
    }

    public updateTeacher(teacher: TeacherModel) {
        this.af.database.object('/teachers/'+teacher.id).set(teacher);
    }

    public newPhoto(teacherId:string){
        {
            var imageSource;
            let confirm = this.alertCtrl.create({
                title: this.translate.instant('Image source?'),
                message: '',
                buttons: [
                    {
                        text: this.translate.instant('CAMERA'),
                        handler: () => {
                            imageSource = Camera.PictureSourceType.CAMERA;
                            this.uploadImage(imageSource, teacherId);
                        }
                    },
                    {
                        text: this.translate.instant('SAVEDPHOTOALBUM'),
                        handler: () => {
                            imageSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                            this.uploadImage(imageSource, teacherId);
                        }
                    },
                    {
                        text: this.translate.instant('PHOTOLIBRARY'),
                        handler: () => {
                            imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
                            this.uploadImage(imageSource, teacherId);
                        }
                    }
                ]
            });
            confirm.present();
        }
    }

    private uploadImage(imageSource: any, teacherId:string): any{
        Camera.getPicture({sourceType : imageSource}).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/teacher-images/namedByTeacherId/').child(teacherId+"_"+new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/teachers/'+teacherId+"/profileImageUrl")
                        .set(savedPicture.downloadURL);
                });
        }, (err) => {
            // Handle error
        });
    }

    // public getProfileImageUrl(teacherId: string): any{
    //     return firebase.storage().ref('/teacher-images/namedByTeacherId/').child(teacherId);
    //     }

    getTeachersOfSchool(schoolId: string):Promise<TeacherModel[]> {
        return this.af.database.list('/teachers/', {
            query: {
                orderByChild: 'schoolId',
                equalTo: schoolId
            }
        })
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    public getSchoolAdminTeachers() {
        return this.getTeachersOfSchools(this.schoolProvider.getSchoolAdminSchools())
    }

    public getBranchAdminTeachers() {
        return this.getTeachersOfSchools(this.schoolProvider.getBranchAdminSchools())
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): TeacherModel[] {
        let teacherArray: Array<TeacherModel> = [];
        for (let obj of objs) {
            var teacher = new TeacherModel().fromObject(obj);
            teacherArray.push(teacher);
        }
        return teacherArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): TeacherModel {
        return new TeacherModel().fromObject(obj);
    }

    private getTeachersOfSchools(schools: Promise<SchoolModel[]>) {
        return schools.then(schools => {
            let teachers = []
            schools.forEach( school => {
                let teachersOfThisSchool = this.getTeachersOfSchool(school.id)
                teachers.push(teachersOfThisSchool)
            })
            return teachers
        })
    }
}
