import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';
import {AuthData} from "./auth-data";
import {InvitationModel} from "../models/invitation-model";

@Injectable()
export class Invitation {

    constructor(public af: FirebaseApp, private authDataProvider: AuthData){
    }

    // adds invitation to class and returns invitationId
    public createInvitation(classId, hostUserId, message, datetime){
        return this.af.database.list("/classes/" + classId + "/invitations/").push({
            hostUserId: hostUserId,
            message: message,
            datetime: datetime
        }).key
    }

    // returns all invitations of class
    public getInvitations(classId): Promise<InvitationModel[]>{
        return this.af.database.list("/classes/" + classId + "/invitations/")
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // returns all invitations filtered by hostId
    getInvitationsOfHost(classId, hostUserId): Promise<InvitationModel[]>{
        return this.af.database.list("/classes/" + classId + "/invitations/", {
            query: {
                orderByChild: 'hostUserId',
                equalTo: hostUserId
            }
        })
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
    }

    // deletes an invitation, given classId and invitationId.
    public deleteInvitation(classId, invitationId){
        return this.af.database().ref("/classes/" + classId + "/invitations/" + invitationId).remove();
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): InvitationModel[] {
        let modelArray: Array<InvitationModel> = [];
        for (let obj of objs) {
            var model = new InvitationModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): InvitationModel {
        return new InvitationModel().fromObject(obj);
    }
}
