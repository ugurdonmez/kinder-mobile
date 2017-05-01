import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";
import {Camera} from "ionic-native";
import * as firebase from 'firebase';
import {WeeklyActivityModel} from "../models/weekly-activity-model";

@Injectable()
export class WeeklyActivity {

    constructor(public af: AngularFire, private authDataProvider: AuthData){
    }

    // uploads the image. upload method is chosen by imageSource parameter.
    public addActivityImage(imageSource, classId:string, date:string){
        Camera.getPicture({
            sourceType : imageSource,
            saveToPhotoAlbum: false
        }).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/activity-images/' + classId).child(new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.object('/classes/'+classId+"/weeklyactivities/"+date)
                        .set(
                            savedPicture.downloadURL
                        );
                });
        }, (err) => {
            // Handle error
        });
    }

    // returns url of requested activity image
    public getActivityImage(classId:string, date:string): Promise<WeeklyActivityModel> {
        return this.af.database.object('/classes/'+classId+"/weeklyactivities/"+date)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

    // removes weekly activity image link from db. note: .png image file is not deleted from firebase storage. only the link is removed.
    public deleteActivityImage(classId:string, date:string){
        this.af.database.list("/classes/" + classId + "/weeklyactivities/"+date).remove();
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): WeeklyActivityModel {
        return new WeeklyActivityModel().fromObject(obj);
    }

}
