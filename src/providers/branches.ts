import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {BranchModel} from '../models/branch-model';
import { AuthData } from './auth-data';

import {Camera} from "ionic-native";
import {AlertController} from "ionic-angular";

import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "ng2-translate";

@Injectable()
export class Branches {

    branches: any;
    private translate: TranslateService;

    constructor(public af: AngularFire, public authData: AuthData, private alertCtrl: AlertController,
                public translator: Translator){
        this.branches = af.database.list('/branches');
        this.translate = translator.translatePipe;
    }

    public getUserBranches() {
        var userId = this.authData.getUserId();

        // var user_branch_ids = this.af.database.list('/user-branches/'+userId);
        // // console.log("user_branch_ids:");
        // // console.log(user_branch_ids);
        //
        // return user_branch_ids;

        return this.af.database.list('/branches', {
            query: {
                orderByChild: 'adminUserId',
                equalTo: userId
            }
        });
    }

    public getBranch(branchId: string) {
        return this.af.database.object('/branches/' + branchId);
    }

    public getAllBranches(){
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
        this.af.database.object('/branches/'+branch.id).set(branch);
    }

    addSchoolToBranch(branchId: string, schoolId: string) {
        // schoollar zaten branch'larini tutuyor, buna gerek yok o yuzden.
        // duplicate data olunca duzenlemeler, silmeler eklemeler biraz zor oluyor.
        // let branchSchoolsList = this.af.database.list('/branches/' + branchId + '/schools');
        // branchSchoolsList.push(schoolId);
    }

    deleteBranch(branchId: string){
        this.af.database.object('/branches/' + branchId).remove();
    }

    public newPhoto(branchId:string){
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

    private uploadImage(imageSource: any, branchId:string): any{
        Camera.getPicture({sourceType : imageSource}).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/branch-images/namedById/').child(branchId+"_"+new Date().getDate() + " @ " + new Date().getTime());
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/branches/'+branchId+"/logoURL")
                        .set(savedPicture.downloadURL);
                });
        }, (err) => {
            // Handle error
        });
    }
}
