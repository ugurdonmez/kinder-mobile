import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";

@Injectable()
export class Message {
    private userId: string;

    constructor(public af: AngularFire, private authData: AuthData){
        this.userId = this.authData.getUserId();
    }

    ////////////// CLASS MESSAGING
    // sends new message to class wall
    public postToClassWall(classId: string, message: string){
        let time = new Date().getTime();
        this.af.database.list("classes/" + classId + "/" + "wall").push(
            {
                message: message,
                timestamp: time,
                sender: this.userId
            }
        );
    }

    // gets class wall
    // TODO we can add pagination
    public getClassWall(classId: string){
        return this.af.database.list("classes/" + classId + "/" + "wall");
    }

    //sets class wall unread for all users
    private setClassWallUnreadForAll(classId: string){
        this.af.database.object("classes/" + classId + "/wallRead").remove(); // sets class wall unread at all users
        this.setClassWallReadForThisUser(classId)

    }

    //sets class wall as read
    public setClassWallReadForThisUser(classId: string) {
        this.af.database.object("classes/" + classId + "/wallRead/" + this.userId).set(true)
    }

    //returns if class wall is read or not
    public isClassWallReadForThisUser(classId: string) {
        return this.af.database.object("classes/" + classId + "/wallRead/" + this.userId)
    }


    ////////////// PRIVATE MESSAGING
    // call this when user sends a message to another user.
    public sendMessage(receiverUserId, message){
        console.log("Hello message provider sendMessage function");
        console.log(receiverUserId);
        console.log(message);
        let time = new Date().getTime();
        this.af.database.list("user-messages/" + this.userId + "/" + receiverUserId).push(
            {
                message: message,
                timestamp: time,
                sender: this.userId
            }
        );
        this.af.database.list("user-messages/" + receiverUserId + "/" + this.userId).push(
            {
                message: message,
                timestamp: time,
                sender: this.userId
            }
        );

        this.setDialogUnread(receiverUserId, this.userId);
    }

    // returns all private conversations of user.
    // in the current design (10th of Apr, 2017), for parents, this function returns an array with only one element.
    // that one element is the conversation with class teacher.
    // TODO we can add pagination
    getAllConversations(){
        return this.af.database.list("user-messages/" + this.userId)
    }

    // returns whole conversation with a user.
    // TODO we can add pagination
    getConversation(interactionUserId){
        return this.af.database.list("user-messages/" + this.userId + "/" + interactionUserId)
    }

    // deletes one message from the conversation.
    deleteMessage(interactionUserId, messageId){
        this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/" + messageId).remove();
    }

    // call this when user marks a dialog as unread, or, when user sends a message.
    public setDialogUnread(receiverUserId: string, senderUserId: string){
        this.af.database.object("user-messages/" + receiverUserId + "/" + senderUserId + "/isUnread").set(true)
    }

    // call this when user reads an unread message
    public setDialogRead(interactionUserId: string){
        this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/isUnread").set(false)
    }

    // returns if dialog with given userId is unread or not.
    public isDialogUnread(interactionUserId: string){
        return this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/isUnread")
    }
}
