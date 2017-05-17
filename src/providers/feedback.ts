import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';
import {FeedbackModel} from "../models/feedback-model";

@Injectable()
export class Feedback {

    constructor(public af: AngularFire){
    }

    public sendFeedbackForStudent(classId: string, parentUserId: string, date: string, feedback: FeedbackModel): void{
        this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).set(
            feedback
        )
    }

    public getFeedbackForStudent(classId: string, parentUserId: string, date: string): Promise<FeedbackModel>{
        return this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date)
            .map(obj => {
                return this.castObjectToModel(obj)
            })
            .first()
            .toPromise()
    }

    public deleteFeedbackForStudent(classId: string, parentUserId: string, date: string): void{
        this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).remove();
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
