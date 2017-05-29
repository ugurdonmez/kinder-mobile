import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";
import {ConversationModel} from "../models/conversation-model";
import {ClassWallModel} from "../models/class-wall-model";
import {MessageModel} from "../models/message-model";

@Injectable()
export class Message {
    private userId: string;

    constructor(public af: AngularFire, private authData: AuthData){
        this.userId = this.authData.getUserId();
    }

    ////////////// CLASS MESSAGING
    // sends new message to class wall
    public postToClassWall(classId: string, message: string): void{
        let time = new Date().getTime();
        this.af.database.list("classes/" + classId + "/wall" + "/conversation").push(
            {
                message: message,
                timestamp: time,
                sender: this.userId
            }
        );
        this.setClassWallUnreadForAll(classId);
        this.setClassWallReadForThisUser(classId);
    }

    // gets class wall
    // TODO we can add pagination
    // TODO refactor
    public getClassWall(classId: string): Promise<ClassWallModel>{
        return this.af.database.object("classes/" + classId + "/wall")
            .map(obj => {
                return this.castClassWallObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

   public getMessagesOfClassWall(classId: string):Promise<MessageModel[]>{
      return this.af.database.list("classes/" + classId + "/wall" + "/conversation")
         .map(obj => {
            return this.castMessageListToModel(obj)
         })
         .first()
         .toPromise()
   }

    //sets class wall unread for all users
    private setClassWallUnreadForAll(classId: string): void{
        this.af.database.object("classes/" + classId + "/wall" + "/wallRead").remove(); // sets class wall unread at all users
    }

    //sets class wall as read
    public setClassWallReadForThisUser(classId: string): void{
        this.af.database.object("classes/" + classId + "/wall" + "/wallRead/" + this.userId).set(true)
    }

    //returns if class wall is read for this user or not
    public isClassWallReadForThisUser(classId: string): Promise<Boolean> {
        return this.af.database.object("classes/" + classId + "/wall" + "/wallRead/" + this.userId)
            .map(obj => {
                return !!(obj.$value)
            })
            .first()
            .toPromise()
    }

   public deletePostFromClassWall(classId: string, postId: string){
      return this.af.database.object("classes/" + classId + "/" + "wall" + "/conversation/" + postId).remove();
   }

    // Conversion: FirebaseObjectObservable -> Model
    private castClassWallObjectToModel(obj: any): ClassWallModel {
        return new ClassWallModel().fromObject(obj);
    }


    ////////////// PRIVATE MESSAGING
    // call this when user sends a message to another user.
    public sendMessage(receiverUserId: string, message: string): void{
        // console.log("Hello message provider sendMessage function");
        // console.log(receiverUserId);
        // console.log(message);
        let time = new Date().getTime();
        this.af.database.list("user-messages/" + this.userId + "/" + receiverUserId + "/conversation").push(
            {
                message: message,
                timestamp: time,
                sender: this.userId
            }
        );
        this.af.database.list("user-messages/" + receiverUserId + "/" + this.userId + "/conversation").push(
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
    getAllConversations():Promise<ConversationModel[]>{
        return this.af.database.list("user-messages/" + this.userId)
            .map(obj => {
                return this.castDialogListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // returns whole conversation with a user.
    // TODO we can add pagination
    public getConversation(interactionUserId: string):Promise<ConversationModel>{
        return this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId)
            .map(obj => {
                return this.castDialogObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

   public getMessagesOfConversation(interactionUserId: string):Promise<MessageModel[]>{
        return this.af.database.list("user-messages/" + this.userId + "/" + interactionUserId + "/conversation")
            .map(obj => {
                return this.castMessageListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // deletes one message from the conversation.
    deleteMessage(interactionUserId: string, messageId: string): void{
        this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/conversation"+ messageId).remove();
    }

    // call this when user marks a dialog as unread, or, when user sends a message.
    public setDialogUnread(receiverUserId: string, senderUserId: string): void{
        this.af.database.object("user-messages/" + receiverUserId + "/" + senderUserId + "/isUnread").set(true)
    }

    // call this when user reads an unread message
    public setDialogRead(interactionUserId: string): void{
        this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/isUnread").set(false)
    }

    // Warning: this function is replaced by this.getConversation()
    // returns if dialog with given userId is unread or not.
    // public isDialogUnread(interactionUserId: string){
    //     return this.af.database.object("user-messages/" + this.userId + "/" + interactionUserId + "/isUnread")
    // }

    // Conversion: FirebaseListObservable -> Model
    private castDialogListToModel(objs: any[]): ConversationModel[] {
        let modelArray: Array<ConversationModel> = [];
        for (let obj of objs) {
            var model = new ConversationModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castDialogObjectToModel(obj: any): ConversationModel {
        return new ConversationModel().fromObject(obj);
    }

    private castMessageListToModel(objs: any): MessageModel[]{
       let modelArray: Array<MessageModel> = [];
       for (let obj of objs) {
          var model = new MessageModel().fromObject(obj);
          modelArray.push(model);
       }
       return modelArray;
    }
}
