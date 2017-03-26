import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class Feedback {

    constructor(public af: AngularFire){
    }

    public sendFeedbackForStudent(classId: string, parentUserId: string, date: string, feedback){
        return this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).set(
            feedback
        )
    }

    public getFeedbackForStudent(classId: string, parentUserId: string, date: string){
        return this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date)
    }

    public deleteFeedbackForStudent(classId: string, parentUserId: string, date: string){
        this.af.database.object("/classes/" + classId + "/dailyfeedback/" + parentUserId + "/" + date).remove();
    }


}
