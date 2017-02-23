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

@Injectable()
export class Teachers {

    teachers: any;
    private translate: TranslateService;

    constructor(public af: AngularFire, public authData: AuthData, private alertCtrl: AlertController,
                public translator: Translator){
        this.teachers = af.database.list('/teachers');
        this.translate = translator.translatePipe;
    }

    // TODO ugur hoca'nin github'dan issue #6'ya verecegi yanita gore geri eklenebilir
    // public getUserTeachers(callback) {
    //     let teacherCursors : any[] = [];
    //     var userId = this.authData.getUserId();
    //
    //     var user_teacher_ids = this.af.database.list('/user-teachers/'+userId, {preserveSnapshot: true});
    //     // console.log("user_teacher_ids:");
    //     // console.log(user_teacher_ids);
    //
    //     user_teacher_ids.subscribe(snapshots=>{
    //             snapshots.forEach(
    //                 snapshot=>{
    //                     // console.log(snapshot.val().teacherId);
    //                     teacherCursors.push(snapshot.val().teacherId);
    //                 });
    //             // console.log(teacherCursors)
    //             callback(teacherCursors)
    //         }
    //     )
    // }

    public getTeacher(teacherId: string) {
        return this.af.database.object('/teachers/' + teacherId);
    }

    public getAllTeachers() {
        return this.af.database.list('/teachers/');
    }

    public addTeacher(teacher: TeacherModel) {
        return this.teachers.push(teacher).key;


        // TODO ugur hoca'nin github'dan issue #6'ya verecegi yanita gore asagidaki kisim geri eklenebilir
        // var teacherId = pushedTeacher.key;
        //console.log("teacherId: " + teacherId);
        // var userId = this.authData.getUserId();
        // var user_teachers = this.af.database.list('/user-teachers/'+userId);
        // user_teachers.push({'teacherId':teacherId});
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
            var profilePictureRef = firebase.storage().ref('/teacher-images/namedByTeacherId/').child(teacherId+"_"+new Date().getDate() + " @ " + new Date().getTime());
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

}
