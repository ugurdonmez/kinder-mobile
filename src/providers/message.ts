import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {AuthData} from "./auth-data";

@Injectable()
export class Message {
    private userId: string;

    constructor(public af: AngularFire, private authData: AuthData){
        this.userId = this.authData.getUserId();
    }

    public sendMessage(receiverUserId, message){
        let time = new Date().getTime();
        this.af.database.list("user-messages/" + this.userId + "/outbox/").push(
            {
                receiverId:receiverUserId,
                message: message,
                timestamp: time
            }
        );
        this.af.database.list("user-messages/" + receiverUserId + "/inbox/").push(
            {
                senderId:this.userId,
                message: message,
                timestamp: time
            }
        )
    }

    getInbox(){
        return this.af.database.list("user-messages/" + this.userId + "/inbox")
    }

    getOutbox(){
        return this.af.database.list("user-messages/" + this.userId + "/outbox")
    }

    deleteInboxMessage(messageId){
        this.af.database.object("user-messages/" + this.userId + "/inbox/" + messageId).remove();
    }

    deleteOutboxMessage(messageId){
        this.af.database.object("user-messages/" + this.userId + "/outbox/" + messageId).remove();
    }
}
