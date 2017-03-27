import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {Camera} from "ionic-native";
import * as firebase from 'firebase';

@Injectable()
export class Homework {

    constructor(public af: AngularFire){
    }

    // adds a homework to a class.
    public addHomework(classId: string, homework){
        return this.af.database.list("/classes/" + classId + "/homeworks/").push(homework)
    }

    // gets a homework from a class. also, links to attachments and list of students that completed that homework are included.
    public getHomeworks(classId: string){
        return this.af.database.list("/classes/" + classId + "/homeworks/")
    }

    // deletes a homework from a class.
    public deleteHomework(classId: string, homeworkId: string){
        this.af.database.object("/classes/" + classId + "/homeworks/" + homeworkId).remove();
    }

    // adds an attachment to homework. image only for now.
    public addAttachmentToHomework(classId: string, homeworkId: string, imageSource){
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
    public removeAttachmentFromHomework(classId: string, homeworkId: string, attachmentId: String){
        this.af.database.object('/classes/'+classId+"/homeworks/" + homeworkId + "/attachments/" + attachmentId).remove();
    }

    // when a student completed a homework, call this function to mark student as completed
    public markStudentCompleted(classId: string, homeworkId: string, studentUserId: string){
        this.af.database.object('/classes/'+classId+"/homeworks/"+homeworkId+"/completedStudents/" + studentUserId)
            .set(true);
    }

    // to undo a student completed homework status
    public markStudentNotCompleted(classId: string, homeworkId: string, studentUserId: string){
        this.af.database.object('/classes/'+classId+"/homeworks/"+homeworkId+"/completedStudents/" + studentUserId)
            .remove()
    }
}
