import {Injectable, Component} from '@angular/core';
import 'rxjs/add/operator/map';

import {AngularFire} from 'angularfire2';
import {SchoolModel} from '../models/school-model';
import {AuthData} from './auth-data';
import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "ng2-translate";
import {Classes} from "./classes";


@Injectable()
export class Schools {

   schools: any;
   private translate: TranslateService;

   constructor(public af: AngularFire,
               public authData: AuthData,
               private alertCtrl: AlertController,
               public translator: Translator,
               private classesProvider: Classes) {

      this.schools = af.database.list('/schools');
      this.translate = translator.translatePipe;
   }

   public getSchool(schoolId: string): Promise<SchoolModel> {
      return this.af.database.object('/schools/' + schoolId).map(obj => {
         var branch = this.castObjectToSchoolModel(obj)
         return branch
      })
          .first()
          .toPromise()
   }

   public getAllSchools(): Promise<SchoolModel[]>  {
      return this.af.database.list('/schools/')
          .map(obj => {
             var school = this.castToSchoolModel(obj)
             return school
          })
          .first()
          .toPromise()
   }

   getSchoolsOfBranch(branchId: string): Promise<SchoolModel[]> {
      return this.af.database.list('/schools', {
         query: {
            orderByChild: 'branchId',
            equalTo: branchId
         }
      })
          .map(obj => {
             var school = this.castToSchoolModel(obj)
             return school
          })
          .first()
          .toPromise()
   }

   public addSchool(school: SchoolModel) {
      school.adminUserId = this.authData.getUserId();
      return this.schools.push(school).key;
   }

   public updateSchool(school: SchoolModel) {
      this.af.database.object('/schools/' + school.id).set(school);
   }

   addClassToSchool(schoolId: string, classId: string) {
      // let schoolClasssList = this.af.database.list('/schools/' + schoolId + '/classes');
      // schoolClasssList.push(classId);
   }

   deleteSchool(schoolId: string) {
      this.af.database.object('/schools/' + schoolId).remove();
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

   public getUserSchools(): Promise<SchoolModel[]> {
      var userId = this.authData.getUserId();

      return this.af.database.list('/schools', {
         query: {
            orderByChild: 'adminUserId',
            equalTo: userId
         }
      })
          .map(obj => {
             var school = this.castToSchoolModel(obj)
             return school
          })
          .first()
          .toPromise()
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
               this.af.database.object('/schools/' + schoolId + "/logoURL")
                  .set(savedPicture.downloadURL);
            });
      }, (err) => {
         // Handle error
      });
   }

   // Conversion: FirebaseListObservable -> Model
   private castToSchoolModel(objs: any[]): SchoolModel[] {

      let schoolArray: Array<SchoolModel> = []

      for (let obj of objs) {
         var school = new SchoolModel()

         school.id = obj.id;
         school.name = obj.name;
         school.membershipEnd = obj.membershipEnd;
         school.membershipStart = obj.membershipStart;
         school.buildingAddress = obj.buildingAddress;
         school.branchId = obj.branchId;
         school.isActivated = obj.isActivated;
         school.logoURL = obj.logoURL;
         school.managerName = obj.managerName;
         school.managerTel = obj.managerTel;
         school.activationEmail = obj.activationEmail;
         school.schoolTelephone = obj.schoolTelephone;
         school.secondContactPersonName = obj.secondContactPersonName;
         school.secondContactTelNo = obj.secondContactTelNo;
         school.adminUserId = obj.adminUserId;

         schoolArray.push(school)
      }

      return schoolArray
   }

   // Conversion: FirebaseObjectObservable -> Model
   private castObjectToSchoolModel(obj: any): SchoolModel {

      let school = new SchoolModel()

      school.id = obj.id;
      school.name = obj.name;
      school.membershipEnd = obj.membershipEnd;
      school.membershipStart = obj.membershipStart;
      school.buildingAddress = obj.buildingAddress;
      school.branchId = obj.branchId;
      school.isActivated = obj.isActivated;
      school.logoURL = obj.logoURL;
      school.managerName = obj.managerName;
      school.managerTel = obj.managerTel;
      school.activationEmail = obj.activationEmail;
      school.schoolTelephone = obj.schoolTelephone;
      school.secondContactPersonName = obj.secondContactPersonName;
      school.secondContactTelNo = obj.secondContactTelNo;
      school.adminUserId = obj.adminUserId;

      return school
   }
}
