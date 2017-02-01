import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import {ClassModel} from '../models/class-model';
import { AuthData } from './auth-data';

@Injectable()
export class Classes {

    classes: any;

    constructor(public af: AngularFire, public authData: AuthData){
        this.classes = af.database.list('/classes');
    }

    public getUserClasses(callback) {
        let classCursors : any[] = [];
        var userId = this.authData.getUserId();

        var user_class_ids = this.af.database.list('/user-classes/'+userId, {preserveSnapshot: true});
        // console.log("user_class_ids:");
        // console.log(user_class_ids);

        user_class_ids.subscribe(snapshots=>{
                snapshots.forEach(
                    snapshot=>{
                        // console.log(snapshot.val().classId);
                        classCursors.push(snapshot.val().classId);
                    });
                // console.log(classCursors)
                callback(classCursors)
            }
        )
    }

    public getClass(classId: string) {
        return this.af.database.object('/classes/' + classId);
    }

    public addClass(_class: ClassModel) {
        // this.classes.push(classProvider);
        var pushedClass = this.classes.push(_class);
        var classId = pushedClass.key;
        //console.log("classId: " + classId);
        return classId
    }

    public registerUserToClass(classId: string){
        var userId = this.authData.getUserId();
        var user_classes = this.af.database.list('/user-classes/'+userId);
        user_classes.push({'classId':classId});
    }

    public updateClass(_class: ClassModel) {
        this.af.database.object('/classes/'+_class.id).set(_class);
    }
}
