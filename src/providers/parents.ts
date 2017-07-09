import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {ParentModel} from '../models/parent-model';
import { AuthData } from './auth-data';
import {AlertController} from "ionic-angular";
import {Camera} from "ionic-native";
import * as firebase from 'firebase';
import {Translator} from "../app/translator";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class Parents {

    parents: any;
    private translate: TranslateService;

    constructor(public af: AngularFire, public authData: AuthData, private alertCtrl: AlertController,
                public translator: Translator){
        this.parents = af.database.list('/parents');
        this.translate = translator.translatePipe;
    }

    public getParent(parentId: string): Promise<ParentModel> {
        return this.af.database.object('/parents/' + parentId)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

    public addParent(parent: ParentModel) {
        let userId = this.authData.getUserId();
        this.af.database.object('/parents/'+userId).set(parent);
        return userId;
    }

    public updateParent(parent: ParentModel) {
        this.af.database.object('/parents/'+parent.id).set(parent);
    }

    newPhoto(parentId: string){
        var imageSource;
        let confirm = this.alertCtrl.create({
            title: this.translate.instant('Select profile picture for student.'),
            message: '',
            buttons: [
                {
                    text: this.translate.instant('CAMERA'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.CAMERA;
                        this.uploadImage(imageSource, parentId);
                    }
                },
                {
                    text: this.translate.instant('SAVEDPHOTOALBUM'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                        this.uploadImage(imageSource, parentId);
                    }
                },
                {
                    text: this.translate.instant('PHOTOLIBRARY'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
                        this.uploadImage(imageSource, parentId);
                    }
                }
            ]
        });
        confirm.present();
    }

    private uploadImage(imageSource: any, parentId:string): any{
        Camera.getPicture({sourceType : imageSource}).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/parent-images/namedByParentId/').child(parentId+"_"+new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/parents/'+parentId+"/profileImageUrl")
                        .set(savedPicture.downloadURL);
                });
        }, (err) => {
            // Handle error
        });
    }

    getParentsOfClass(classId: string): Promise<ParentModel[]> {
        return this.af.database.list('/parents', {
            query: {
                orderByChild: 'classId',
                equalTo: classId
            }
        })
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    public getParentsByBranchAdminId(): Promise<ParentModel[]> {
        var userId = this.authData.getUserId();

        return this.af.database
           .list('/parents', {
               query: {
                   orderByChild: 'branchAdminId',
                   equalTo: userId
               }
           })
           .map(this.castListToModel)
           .first()
           .toPromise()
    }

    public getParentsBySchoolAdminId(): Promise<ParentModel[]> {
        var userId = this.authData.getUserId();

        return this.af.database
           .list('/parents', {
               query: {
                   orderByChild: 'schoolAdminId',
                   equalTo: userId
               }
           })
           .map(this.castListToModel)
           .first()
           .toPromise()
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): ParentModel[] {
        let parentArray: Array<ParentModel> = [];
        for (let obj of objs) {
            var parent = new ParentModel().fromObject(obj);
            parentArray.push(parent);
        }
        return parentArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): ParentModel {
        return new ParentModel().fromObject(obj);
    }
}
