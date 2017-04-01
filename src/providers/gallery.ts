import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {Camera} from "ionic-native";
import * as firebase from 'firebase'

@Injectable()
export class Gallery {

    constructor(public af: AngularFire){
    }

    // creates a new empty album and returns albumId.
    public addAlbum(classId: string, albumName: string){
        return this.af.database.list("/classes/" + classId + "/gallery/albums").push(albumName);
    }

    // returns list of albums
    public getAllAlbums(classId: string){
        return this.af.database.list("/classes/" + classId + "/gallery/albums");
    }

    // deletes an album and all images in it.
    public deleteAlbum(classId: string, albumId: string){
        this.getImagesInAlbum(classId, albumId).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.deleteImage(classId, snapshot.$key);
                // this.af.database.object("/classes/" + classId + '/gallery/images/'+snapshot.$key).remove();
            });
            this.af.database.object("/classes/" + classId + '/gallery/albums/'+albumId).remove();
        })
    }

    // just prints if album is empty or not. returns nothing. does nothing.
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

    // adds new image
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

    // deletes an image
    public deleteImage(classId: string, imageId: string){
        this.af.database.object("/classes/" + classId + '/gallery/images/' + imageId).remove();
    }

    // returns all images of album
    public getImagesInAlbum(classId: string, albumId: string) {
        return this.af.database.list("/classes/" + classId + '/gallery/images/', {
            query: {
                orderByChild: 'albumId',
                equalTo: albumId
            }
        })
    }

    // returns an image.
    public getImage(classId: string, imageId: string){
        return this.af.database.object("/classes/" + classId + "/gallery/images/" + imageId);
    }

    // returns all images in that class
    public getImagesOfClass(classId: string){
        return this.af.database.list("/classes/" + classId + "/gallery/images/");
    }

    // tags student to image
    public tagStudentInImage(classId: string, imageId: string, studentId: string){
        this.af.database.object("/classes/" + classId + "/gallery/student-images/" + studentId + "/" + imageId).set(true);
    }

    // untags student from image
    public untagStudentInImage(classId: string, imageId: string, studentId: string){
        this.af.database.object("/classes/" + classId + "/gallery/student-images/" + studentId + "/" + imageId).remove();
    }

    // I couldn't find any better way using angularfire2. :(
    // usage: Get imageIds from here, and retrieve those images separately.
    public getImageIdsOfStudent(classId: string, studentId: string){
        return this.af.database.list("/classes/" + classId + "/gallery/student-images/" + studentId);
        // this.af.database.list("/classes/" + classId + "/gallery/images/", {
        //     query: {
        //         orderByChild: 'taggedStudents.'+studentId,
        //         equalTo: true
        //     }
        // })
    }
}

// /gallery/albums = [homework, study, etc]
// /gallery/images = {
//     imageId =
//         {
//             imgUrl: string
//             album: albumId
//         }
// }
// /gallery/student-images/[studentidhere] = {
// imageId1 = true,
// imageId2 = true
// }