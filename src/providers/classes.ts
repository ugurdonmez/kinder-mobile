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

    public getClass(classId: string): Promise<ClassModel> {
        return this.af.database.object('/classes/' + classId)
            .map(obj => {
                return this.castObjectToClassModel(obj)
            })
            .first()
            .toPromise()
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

    getClassesOfSchool(schoolId: string): Promise<ClassModel[]> {
        return this.af.database.list('/classes', {
            query: {
                orderByChild: 'schoolId',
                equalTo: schoolId
            }
        })
            .map(obj => {
                return this.castListToClassModel(obj)
            })
            .first()
            .toPromise()
    }

    deleteClass(classId: string){
        this.af.database.object('/classes/' + classId).remove();
    }

    public getClassesOfTeacher(teacherId: string): Promise<ClassModel[]>{
        return this.af.database.list('/classes', {
            query: {
                orderByChild: 'teacher_id',
                equalTo: teacherId
            }
        })
            .map(obj => {
                return this.castListToClassModel(obj)
            })
            .first()
            .toPromise()
    }

    // Conversion: FirebaseListObservable -> Model
    private castListToClassModel(objs: any[]): ClassModel[] {
        let classArray: Array<ClassModel> = [];
        for (let obj of objs) {
            var _class = new ClassModel().fromObject(obj);
            classArray.push(_class);
        }
        return classArray;
    }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToClassModel(obj: any): ClassModel {
        return new ClassModel().fromObject(obj);
    }
}
