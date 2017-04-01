import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {Camera} from "ionic-native";
import * as firebase from 'firebase'

@Injectable()
export class Gallery {

    constructor(public af: AngularFire){
    }

    public addAlbum(classId: string, albumName: string){
        return this.af.database.list("/classes/" + classId + "/gallery/albums").push(albumName);
    }

    public getAllAlbums(classId: string){
        return this.af.database.list("/classes/" + classId + "/gallery/albums");
    }

    public deleteAlbum(classId: string, albumId: string){
        this.getImagesInAlbum(classId, albumId).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.af.database.object("/classes/" + classId + '/gallery/images/'+snapshot.$key).remove();
            });
            this.af.database.object("/classes/" + classId + '/gallery/albums/'+albumId).remove();
        })
    }

    public isAlbumEmpty(classId: string, albumId: string) {
        this.getImagesInAlbum(classId, albumId).subscribe(snapshots => {
            if(snapshots.length > 0){
                console.log("album is not empty");
            }
            else{
                console.log("album is empty");
            }
        });
    }


    public addImage(classId: string, imageSource, albumId ?: string){
        Camera.getPicture({
            sourceType : imageSource,
            saveToPhotoAlbum: false
        }).then((image) => {
            let imageData = image;
            let profilePictureRef = firebase.storage().ref('/gallery/images/' + classId).child(new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    let imageId = this.af.database.list("/classes/" + classId + '/gallery/images/')
                        .push({
                            imgUrl: savedPicture.downloadURL,
                        }).key;
                    if (albumId){
                        this.af.database.object("/classes/" + classId + '/gallery/images/' + imageId + '/albumId').set(albumId);
                    }
                });
        }, (err) => {
            // Handle error
        });
    }

    public deleteImage(classId: string, imageId: string){
        this.af.database.object("/classes/" + classId + '/gallery/images/' + imageId).remove();
    }

    public getImagesInAlbum(classId: string, albumId: string) {
        return this.af.database.list("/classes/" + classId + '/gallery/images/', {
            query: {
                orderByChild: 'albumId',
                equalTo: albumId
            }
        })
    }

    public getImagesOfClass(classId: string){
        return this.af.database.list("/classes/" + classId + "/gallery/images/");
    }

    public tagStudentInImage(classId: string, imageId: string, studentId: string){
        this.af.database.object("/classes/" + classId + "/gallery/images/" + imageId + "/taggedStudents/" + studentId).set(true);
    }

    public untagStudentInImage(classId: string, imageId: string, studentId: string){
        this.af.database.object("/classes/" + classId + "/gallery/images/" + imageId + "/taggedStudents/" + studentId).remove();
    }
}

// /gallery/albums = [homework, study, etc]
// /gallery/images = {
//     imageId =
//         {
//             imgUrl: string
//             album: albumId
//             taggedStudents =
//                 {
//                     studentUserId1 = true,
//                     studentUserId2 = true
//                 }
//         }
// }