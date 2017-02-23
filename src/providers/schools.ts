import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {SchoolModel} from '../models/school-model';
import { AuthData } from './auth-data';
import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "ng2-translate";

@Injectable()
export class Schools {

    schools: any;
    private translate: TranslateService;

    constructor(public af: AngularFire, public authData: AuthData, private alertCtrl: AlertController,
                public translator: Translator){
        this.schools = af.database.list('/schools');
        this.translate = translator.translatePipe;
    }

    public getSchool(schoolId: string) {
        return this.af.database.object('/schools/' + schoolId);
    }

    public getAllSchools(){
        return this.af.database.list('/schools/');
    }

    getSchoolsOfBranch(branchId: string){
        return this.af.database.list('/schools', {
            query: {
                orderByChild: 'branchId',
                equalTo: branchId
            }
        });
    }

    public addSchool(school: SchoolModel) {
        school.adminUserId = this.authData.getUserId();
        return this.schools.push(school).key;
    }

    public updateSchool(school: SchoolModel) {
        this.af.database.object('/schools/'+school.id).set(school);
    }

    addClassToSchool(schoolId: string, classId: string) {
        // let schoolClasssList = this.af.database.list('/schools/' + schoolId + '/classes');
        // schoolClasssList.push(classId);
    }

    deleteSchool(schoolId: string){
        this.af.database.object('/schools/' + schoolId).remove();
    }

    public getUserSchools() {
        var userId = this.authData.getUserId();

        return this.af.database.list('/schools', {
            query: {
                orderByChild: 'adminUserId',
                equalTo: userId
            }
        });
    }

    public newPhoto(schoolId:string){
        {
            var imageSource;
            let confirm = this.alertCtrl.create({
                title: this.translate.instant('Image source?'),
                message: '',
                buttons: [
                    {
                        text: this.translate.instant('SAVEDPHOTOALBUM'),
                        handler: () => {
                            imageSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                            this.uploadImage(imageSource, schoolId);
                        }
                    },
                    {
                        text: this.translate.instant('PHOTOLIBRARY'),
                        handler: () => {
                            imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
                            this.uploadImage(imageSource, schoolId);
                        }
                    }
                ]
            });
            confirm.present();
        }
    }

    private uploadImage(imageSource: any, schoolId:string): any{
        Camera.getPicture({sourceType : imageSource}).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/school-images/namedBySchoolId/').child(schoolId+"_"+new Date().getDate() + " @ " + new Date().getTime());
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/schools/'+schoolId+"/logoURL")
                        .set(savedPicture.downloadURL);
                });
        }, (err) => {
            // Handle error
        });
    }

}
