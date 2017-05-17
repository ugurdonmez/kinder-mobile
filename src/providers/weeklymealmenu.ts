import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";
import {Camera} from "ionic-native";
import * as firebase from 'firebase';
import {WeeklyMealMenuModel} from "../models/weekly-meal-menu-model";
import {PromiseObservable} from "rxjs/observable/PromiseObservable";

@Injectable()
export class WeeklyMealMenu {

    constructor(public af: AngularFire, private authDataProvider: AuthData){
    }

    // uploads the image. upload method is chosen by imageSource parameter.
    public addMenuImage(imageSource, classId:string, date:string){
        // console.log(imageSource, classId, date);
        Camera.getPicture({
            sourceType : imageSource,
            saveToPhotoAlbum: false
        }).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/weekly-meal-menu-images/' + classId).child(new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/classes/'+classId+"/weeklyMenu/"+date)
                        .set(
                            savedPicture.downloadURL
                        );
                });
        }, (err) => {
            // Handle error
        });
    }

    // returns url of requested menu image
    public getMenuImage(classId:string, date:string): Promise<WeeklyMealMenuModel>{
        return this.af.database.object('/classes/'+classId+"/weeklyMenu/"+date)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

    // removes menu image link from db. note: .png image file is not deleted from firebase storage. only the link is removed.
    public deleteMenuImage(classId:string, date:string){
        this.af.database.list("/classes/" + classId + "/weeklyMenu/"+date).remove();
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): WeeklyMealMenuModel[] {
        let modelArray: Array<WeeklyMealMenuModel> = [];
        for (let obj of objs) {
            var model = new WeeklyMealMenuModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): WeeklyMealMenuModel {
        return new WeeklyMealMenuModel().fromObject(obj);
    }

}
