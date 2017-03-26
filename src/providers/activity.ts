import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";
import {Camera} from "ionic-native";
import * as firebase from 'firebase';

@Injectable()
export class Activity {

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
                    this.af.database.object('/classes/'+classId+"/activities/"+date)
                        .set(
                            savedPicture.downloadURL
                        );
                });
        }, (err) => {
            // Handle error
        });
    }

    // returns url of requested activity image
    public getActivityImage(classId:string, date:string){
        return this.af.database.object('/classes/'+classId+"/activities/"+date)
    }

    // removes activity image link from db. note: .png image file is not deleted from firebase storage. only the link is removed.
    public deleteActivityImage(classId:string, date:string){
        this.af.database.list("/classes/" + classId + "/activities/"+date).remove();
    }

}
