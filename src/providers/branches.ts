import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

import {FirebaseApp} from 'angularfire2';
import {BranchModel} from '../models/branch-model';
import {AuthData} from './auth-data';

import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {Schools} from "./schools";
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class Branches {
   
   branches: any;
   private translate: TranslateService;

   constructor(public af: FirebaseApp,
               public authData: AuthData,
               private alertCtrl: AlertController,
               public translator: Translator,
               private schoolsProvider: Schools,
               private afd: AngularFireDatabase
   ) {

      this.branches = afd.list('/branches');
      this.translate = translator.translatePipe;
   }

   public getBranchAdminBranches(): Promise<BranchModel[]> {
      var userId = this.authData.getUserId();

      return this.afd.list('/branches', {
            query: {
               orderByChild: 'branchAdminId',
               equalTo: userId
            }
         })
         .map(obj => {
            var branch = this.castToBranchModel(obj)

            return branch
         })
         .first()
         .toPromise()
   }

   public getBranch(branchId: string): Promise<BranchModel> {
      return this.afd.object('/branches/' + branchId).map(obj => {
         var branch = this.castObjectToBranchModel(obj)
         return branch
      })
          .first()
          .toPromise()
   }

   public getAllBranches(): Promise<BranchModel[]> {
      return this.afd.list('/branches/')
          .map(obj => {
             var branch = this.castToBranchModel(obj)
             return branch
          })
          .first()
          .toPromise()
   }

   public addBranch(branch: BranchModel) {
      branch.branchAdminId = this.authData.getUserId();
      return this.branches.push(branch).key;
   }

   public updateBranch(branch: BranchModel) {
      this.afd.object('/branches/' + branch.id).set(branch);
   }

   deleteBranch(branchId: string) {
      this.afd.object('/branches/' + branchId).remove();
      var schoolsOfBranch = this.afd.list('/schools', {
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
               this.afd.object('/branches/' + branchId + "/logoURL")
                  .set(savedPicture.downloadURL);
            });
      }, (err) => {
         // Handle error
      });
   }

   // Conversion: FirebaseListObservable -> Model
   private castToBranchModel(objs: any[]): BranchModel[] {
      let modelArray: Array<BranchModel> = []
      for (let obj of objs) {
         modelArray.push(new BranchModel().fromObject(obj))
      }
      return modelArray
   }

   // Conversion: FirebaseObjectObservable -> Model
   private castObjectToBranchModel(obj: any): BranchModel {
      return new BranchModel().fromObject(obj);
   }
}
