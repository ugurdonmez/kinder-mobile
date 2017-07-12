import {Injectable, Component} from '@angular/core';
import 'rxjs/add/operator/map';

import {FirebaseApp} from 'angularfire2';
import {SchoolModel} from '../models/school-model';
import {AuthData} from './auth-data';
import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {Classes} from "./classes";
import {UserModel} from "../models/user-model";


@Injectable()
export class Schools {

   schools: any;
   private translate: TranslateService;

   constructor(public af: FirebaseApp,
               public authData: AuthData,
               private alertCtrl: AlertController,
               public translator: Translator,
               private classesProvider: Classes) {

      this.schools = af.database.list('/schools');
      this.translate = translator.translatePipe;
   }

   public getSchoolByBranchAdminId(): Promise<SchoolModel[]> {

      var userId = this.authData.getUserId();

      // console.log('Schools: getSchoolByBranchAdminId')
      // console.log('userId ' + userId)

      return this.af.database
         .list('/schools', {
            query: {
               orderByChild: 'branchAdminId',
               equalTo: userId
            }
         })
         .map(this.castToSchoolModel)
         .first()
         .toPromise()
   }

   public getSchoolBySchoolAdminId(): Promise<SchoolModel[]> {

      var userId = this.authData.getUserId();

      return this.af.database
         .list('/schools', {
            query: {
               orderByChild: 'schoolAdminId',
               equalTo: userId
            }
         })
         .map(this.castToSchoolModel)
         .first()
         .toPromise()
   }

   public getSchool(schoolId: string):Promise<SchoolModel> {
      return this.af.database.object('/schools/' + schoolId)
         .map(obj => {
            console.log("get school")
            console.log(schoolId)
            console.log(obj)
            return this.castListToModel([obj])[0]
         })
         .first()
         .toPromise()
   }

   // Conversion: FirebaseListObservable -> Model
   private castListToModel(objs: any[]): SchoolModel[] {
      return objs.map(o => {
         return new SchoolModel().fromObject(o);
      })
   }

   public addSchool(school) {
      if (!!school.schoolAdminEmail){
         let schoolAdmin = new UserModel()
         schoolAdmin.branchId = school.branchId
         schoolAdmin.branchAdminId = school.branchAdminId
         schoolAdmin.role = 'school-admin'
         schoolAdmin.email = school.schoolAdminEmail
         this.authData.newInvitation(schoolAdmin)
         delete school.schoolAdminEmail
      }
      return this.schools.push(school).key;
   }

   public updateSchool(school: SchoolModel) {
      this.af.database().ref('/schools/' + school.id).set(school);
   }

   deleteSchool(schoolId: string) {
      this.af.database().ref('/schools/' + schoolId).remove();
      var classesOfSchool = this.af.database.list('/classes', {
         query: {
            orderByChild: 'schoolId',
            equalTo: schoolId
         }
      });
      classesOfSchool.subscribe(snapshots => {
         snapshots.forEach(classOfSchool => {
            var classId = classOfSchool.$key;
            this.classesProvider.deleteClass(classId);
         })
      })
   }

   public newPhoto(schoolId: string) {
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

   private uploadImage(imageSource: any, schoolId: string): any {
      Camera.getPicture({sourceType: imageSource}).then((image) => {
         var imageData = image;
         var profilePictureRef = firebase.storage().ref('/school-images/namedBySchoolId/').child(schoolId + "_" + new Date().getDate() + " @ " + new Date().getTime() + ".png");
         profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
            .then((savedPicture) => {
               this.af.database().ref('/schools/' + schoolId + "/logoURL")
                  .set(savedPicture.downloadURL);
            });
      }, (err) => {
         // Handle error
      });
   }

   // Conversion: FirebaseListObservable -> Model
   private castToSchoolModel(objs: any[]): SchoolModel[] {
      return objs.map(o => {
         return new SchoolModel().fromObject(o);
      })
   }
}
