import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';
import {Camera} from "ionic-native";
import * as firebase from 'firebase'
import {ImageModel} from "../models/image-model";
import {AlbumModel} from "../models/album-model";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class Gallery {

    constructor(public af: FirebaseApp, private afd: AngularFireDatabase){
    }

    /////////////////// ALBUMS //////////////////////////////
    // creates a new empty album and returns albumId.
    public addAlbum(classId: string, albumName: string): string{
        return this.afd.list("/classes/" + classId + "/gallery/albums").push(albumName).key;
    }

    // returns list of albums
    public getAllAlbums(classId: string): Promise<AlbumModel[]>{
        return this.afd.list("/classes/" + classId + "/gallery/albums")
            .map(obj => {
                return this.castListOfAlbumsToModel(obj)
            })
            .first()
            .toPromise()
    }

    // returns list of albums
    public getAlbums(classId: string, albumIds: string[]): Promise<AlbumModel[]>{
        return this.afd.list("/classes/" + classId + "/gallery/albums")
            .map(obj => {
                let selectedAlbums:AlbumModel[] = []
                this.castListOfAlbumsToModel(obj).forEach(album => {
                    // console.log('gallery provider foreach album:')
                    // console.log(album)
                    if (albumIds.indexOf(album.id) > -1){
                        selectedAlbums.push(album)
                    }
                })
                // console.log('gallery provider getalbums albumIds:')
                // console.log(albumIds)
                // console.log('gallery provider getalbums result:')
                // console.log(selectedAlbums)
                return selectedAlbums
            })
            .first()
            .toPromise()
    }

    // deletes an album and all images in it.
    public deleteAlbum(classId: string, albumId: string): void{
        this.getImagesInAlbum(classId, albumId).then(snapshots => {
            snapshots.forEach(snapshot => {
                this.deleteImage(classId, snapshot.id);
                // this.afd.object("/classes/" + classId + '/gallery/images/'+snapshot.$key).remove();
            });
            this.afd.object("/classes/" + classId + '/gallery/albums/'+albumId).remove();
        })
    }

    // just prints if album is empty or not. returns nothing. does nothing.
    public isAlbumEmpty(classId: string, albumId: string): void {
        this.getImagesInAlbum(classId, albumId).then(snapshots => {
            if(snapshots.length > 0){
                console.log("album is not empty");
            }
            else{
                console.log("album is empty");
            }
        });
    }

    /////////////////// IMAGES //////////////////////////////
    // adds new image
    public uploadImage(classId: string, imageSource){
        return Camera.getPicture({
            sourceType : imageSource,
            saveToPhotoAlbum: false
        }).then((image) => {
            let imageData = image;
            let profilePictureRef = firebase.storage().ref('/gallery/images/' + classId).child(new Date().getDate() + " @ " + new Date().getTime() + ".png");
            return profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    return savedPicture.downloadURL
                });
        });
    }

    // save an image to a class
    public saveImage(classId: string, imageUrl: string){
        this.afd.list("/classes/" + classId + '/gallery/images/').push({imgUrl: imageUrl}).key;
    }

    // deletes an image
    public deleteImage(classId: string, imageId: string): void{
        this.afd.object("/classes/" + classId + '/gallery/images/' + imageId).remove();
    }

    // returns all images of album
    public getImagesInAlbum(classId: string, albumId: string): Promise<ImageModel[]> {
        return this.afd.list("/classes/" + classId + '/gallery/images/', {
            query: {
                orderByChild: 'albumId',
                equalTo: albumId
            }
        })
            .map(obj => {
                return this.castListOfImagesToModel(obj)
            })
            .first()
            .toPromise()
    }

    // returns an image.
    public getImage(classId: string, imageId: string): Promise<ImageModel>{
        return this.afd.object("/classes/" + classId + "/gallery/images/" + imageId)
            .map(obj => {
                return this.castImageToModel(obj)
            })
            .first()
            .toPromise()
    }

    // returns all images in that class
    public getImagesOfClass(classId: string): Promise<ImageModel[]>{
        return this.afd.list("/classes/" + classId + "/gallery/images/")
            .map(obj => {
                return this.castListOfImagesToModel(obj)
            })
            .first()
            .toPromise()
    }

    // assigns a new album to an image.
    public updateAlbumOfImage(classId: string, imageId: string, albumId: string): void{
        this.afd.object("/classes/" + classId + "/gallery/images/" + imageId+ "/albumId").set(albumId);
    }

    // tags student to image
    public tagStudentInImage(classId: string, imageId: string, studentId: string): void{
        this.afd.object("/classes/" + classId + "/gallery/student-images/" + studentId + "/" + imageId).set(true);
    }

    // untags student from image
    public untagStudentInImage(classId: string, imageId: string, studentId: string): void{
        this.afd.object("/classes/" + classId + "/gallery/student-images/" + studentId + "/" + imageId).remove();
    }

    public isStudentTaggedInImage(classId: string, imageId: string, studentId: string): Promise<boolean>{
        return this.afd.list("/classes/" + classId + "/gallery/student-images/" + studentId + "/" + imageId)
           .map(obj => {
               let result = !!obj.$value
               return result
           })
           .first()
           .toPromise()
    }

    // I couldn't find any better way using angularfire2. :(
    // usage: Get imageIds from here, and retrieve those images separately.
    public getImageIdsOfStudent(classId: string, studentId: string): Promise<string[]>{
        return this.afd.list("/classes/" + classId + "/gallery/student-images/" + studentId)
            .map(obj => {
                return this.castListOfImageIdsToModel(obj)
            })
            .first()
            .toPromise()
    }

    // Conversion: FirebaseListObservable -> Model
    private castListOfImagesToModel(objs: any[]): ImageModel[] {
        let modelArray: Array<ImageModel> = [];
        for (let obj of objs) {
            var model = new ImageModel().fromObject(obj)
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseListObservable -> Model
    private castListOfImageIdsToModel(objs: any[]): string[] {
        let modelArray: Array<string> = [];
        for (let obj of objs) {
            var model = obj.$key
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseListObservable -> Model
    private castListOfAlbumsToModel(objs: any[]): AlbumModel[] {
        let modelArray: Array<AlbumModel> = [];
        for (let obj of objs) {
            var model = new AlbumModel().fromObject(obj)
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castImageToModel(obj: any): ImageModel {
        return new ImageModel().fromObject(obj);
    }
}
