import { Injectable } from '@angular/core';

import { FirebaseApp } from 'angularfire2';
import {FeedbackModel} from "../models/feedback-model";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class Feedback {

    constructor(public af: FirebaseApp, private afd: AngularFireDatabase){
    }

    public sendFeedbackForStudent(classId: string, parentUserId: string, date: string, feedback: FeedbackModel): void{
        this.af.database().ref("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).set(
            feedback
        )
    }

    public getFeedbackForStudent(classId: string, parentUserId: string, date: string): Promise<FeedbackModel>{
        this.afd.list("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            
    }

    public deleteFeedbackForStudent(classId: string, parentUserId: string, date: string): void{
        this.af.database().ref("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).remove();
    }
    
    // Conversion: FirebaseListObservable -> Model
    private castListToModel(objs: any[]): FeedbackModel[] {
        let modelArray: Array<FeedbackModel> = [];
        for (let obj of objs) {
            var model = new FeedbackModel().fromObject(obj);
            modelArray.push(model);
        }
        return modelArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any): FeedbackModel {
        return new FeedbackModel().fromObject(obj);
    }
}
