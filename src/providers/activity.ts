import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database";
import {AuthData} from "./auth-data";
import {Camera} from "ionic-native";
import * as firebase from 'firebase';
import {ActivityModel} from "../models/activity-model";

@Injectable()
export class Activity {

    constructor(public af: FirebaseApp, private authDataProvider: AuthData, private afd: AngularFireDatabase){
    }

    // adds activity to class and returns activityId
    public createActivity(classId, message, datetime){
        return this.afd.list("/classes/" + classId + "/activities/").push({
            message: message,
            datetime: datetime
        }).key
    }

    // returns all activities of class
    public getActivities(classId): Promise<ActivityModel[]>{
        return this.afd.list("/classes/" + classId + "/activities/")
            .map(obj => {
                return this.castListToModel(obj)
            })
            .first()
            .toPromise()
            
    }

    // deletes an activity, given classId and activityId.
    public deleteActivity(classId, activityId){
        return this.af.database().ref("/classes/" + classId + "/activities/" + activityId).remove();
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): ActivityModel[] {
        let modelArray: Array<ActivityModel> = [];
        for (let obj of objs) {
            var model = new ActivityModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): ActivityModel {
        return new ActivityModel().fromObject(obj);
    }

}
