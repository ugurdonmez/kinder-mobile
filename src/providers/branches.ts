import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {AngularFire} from 'angularfire2';
import {BranchModel} from '../models/branch-model';
import {AuthData} from './auth-data';

import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "ng2-translate";
import {Schools} from "./schools";

@Injectable()
export class Branches {

   branches: any;
   private translate: TranslateService;

   constructor(public af: AngularFire,
               public authData: AuthData,
               private alertCtrl: AlertController,
               public translator: Translator,
               private schoolsProvider: Schools) {

      this.branches = af.database.list('/branches');
      this.translate = translator.translatePipe;
   }

   public getUserBranches() {
      var userId = this.authData.getUserId();

      console.log('get user branch : id')
      console.log(userId)

      return this.af.database.list('/branches', {
         query: {
            orderByChild: 'adminUserId',
            equalTo: userId
         }
      })
   }

   public getSchoolAdminBranches(): Promise<BranchModel[]> {

      var userId = this.authData.getUserId()

      return this.af.database
         .list('/branches', {
            query: {
               orderByChild: 'schoolAdminId',
               equalTo: userId
            }
         })
         .map(obj => {
            // console.log('object')
            // console.log(obj)
            var branch = this.castToBranchModel(obj)

            return branch
         })
         .first()
         .toPromise()
   }

   public getBranch(branchId: string) {
      return this.af.database.object('/branches/' + branchId);
   }

   public getAllBranches() {
      return this.af.database.list('/branches/');
   }

   public addBranch(branch: BranchModel) {
      branch.adminUserId = this.authData.getUserId();
      return this.branches.push(branch).key;
      // var pushedBranch = this.branches.push(branch);
      // var branchId = pushedBranch.key;
      //console.log("branchId: " + branchId);

      // var userId = this.authData.getUserId();
      // var user_branches = this.af.database.list('/user-branches/'+userId);
      // user_branches.push({'branchId':branchId});
   }

   public updateBranch(branch: BranchModel) {
      this.af.database.object('/branches/' + branch.id).set(branch);
   }

   addSchoolToBranch(branchId: string, schoolId: string) {
      // schoollar zaten branch'larini tutuyor, buna gerek yok o yuzden.
      // duplicate data olunca duzenlemeler, silmeler eklemeler biraz zor oluyor.
      // let branchSchoolsList = this.af.database.list('/branches/' + branchId + '/schools');
      // branchSchoolsList.push(schoolId);
   }

   deleteBranch(branchId: string) {
      this.af.database.object('/branches/' + branchId).remove();
      var schoolsOfBranch = this.af.database.list('/schools', {
         query: {
            orderByChild: 'branchId',
            equalTo: branchId
         }
      });
      schoolsOfBranch.subscribe(snapshots => {
         snapshots.forEach(school => {
            var schoolId = school.$key;
            this.schoolsProvider.deleteSchool(schoolId);
         })
      })
   }

   public newPhoto(branchId: string) {
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
                     this.uploadImage(imageSource, branchId);
                  }
               },
               {
                  text: this.translate.instant('PHOTOLIBRARY'),
                  handler: () => {
                     imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
                     this.uploadImage(imageSource, branchId);
                  }
               }
            ]
         });
         confirm.present();
      }
   }

   private uploadImage(imageSource: any, branchId: string): any {
      Camera.getPicture({sourceType: imageSource}).then((image) => {
         var imageData = image;
         var profilePictureRef = firebase.storage().ref('/branch-images/namedById/').child(branchId + "_" + new Date().getDate() + " @ " + new Date().getTime() + ".png");
         profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
            .then((savedPicture) => {
               this.af.database.object('/branches/' + branchId + "/logoURL")
                  .set(savedPicture.downloadURL);
            });
      }, (err) => {
         // Handle error
      });
   }

   private castToBranchModel(objs: any[]): BranchModel[] {

      let branchArray: Array<BranchModel> = []

      for (let obj of objs) {
         var branch = new BranchModel()

         branch.id = obj.id
         branch.name = obj.name
         branch.tel = obj.tel
         branch.logoURL = obj.logoURL
         branch.manager = obj.manager
         branch.manager_tel = obj.manager_tel
         branch.manager_mail = obj.manager_mail
         branch.address = obj.address
         branch.adminUserId = obj.adminUserId
         branch.schoolAdminId = obj.schoolAdminId

         branchArray.push(branch)
      }

      return branchArray
   }
}
