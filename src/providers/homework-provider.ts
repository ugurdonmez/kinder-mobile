
import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import { Camera } from "ionic-native";
import * as firebase from 'firebase';
import { HomeworkModel } from "../models/homework-model";

@Injectable()
export class HomeworkProvider {

    constructor(public af: AngularFire){
    }

    // adds a homework to a class, returns key of added element.
    public addHomework(classId: string, homework: HomeworkModel): string{
        return this.af.database.list("/classes/" + classId + "/homeworks/").push(homework).key
    }

    // gets a homework from a class. also, links to attachments and list of students that completed that homework are included.
    public getHomeworks(classId: string): Promise<HomeworkModel[]>{
        return this.af.database.list("/classes/" + classId + "/homeworks/")
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // deletes a homework from a class.
    public deleteHomework(classId: string, homeworkId: string): void{
        this.af.database.object("/classes/" + classId + "/homeworks/" + homeworkId).remove();
    }

    // adds an attachment to homework. image only for now.
    public addAttachmentToHomework(classId: string, homeworkId: string, imageSource): void{
        Camera.getPicture({
            sourceType : imageSource,
            saveToPhotoAlbum: false
        }).then((image) => {
            var imageData = image;
            var profilePictureRef = firebase.storage().ref('/homeworks/' + classId).child(new Date().getDate() + " @ " + new Date().getTime() + ".png");
            profilePictureRef.putString(imageData, 'base64', {contentType: 'image/png'})
                .then((savedPicture) => {
                    this.af.database.list('/classes/'+classId+"/homeworks/"+homeworkId+"/attachments")
                        .push(
                            savedPicture.downloadURL
                        );
                });
        }, (err) => {
            // Handle error
        });
    }

    // removes an attachment from homework. note: media file is not deleted from firebase storage. only the link is removed.
    public removeAttachmentFromHomework(classId: string, homeworkId: string, attachmentId: String): void{
        this.af.database.object('/classes/'+classId+"/homeworks/" + homeworkId + "/attachments/" + attachmentId).remove();
    }

    // when a student completed a homework, call this function to mark student as completed
    public markStudentCompleted(classId: string, homeworkId: string, studentUserId: string): void{
        this.af.database.object('/classes/'+classId+"/homeworks/"+homeworkId+"/completedStudents/" + studentUserId)
            .set(true);
    }

    // to undo a student completed homework status
    public markStudentNotCompleted(classId: string, homeworkId: string, studentUserId: string): void{
        this.af.database.object('/classes/'+classId+"/homeworks/"+homeworkId+"/completedStudents/" + studentUserId)
            .remove()
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): HomeworkModel[] {
        let modelArray: Array<HomeworkModel> = [];
        for (let obj of objs) {
            var model = new HomeworkModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): HomeworkModel {
        return new HomeworkModel().fromObject(obj);
    }
}
