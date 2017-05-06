import {Component, Input} from '@angular/core';
import {Translator} from "../../app/translator";
import {SchoolModel} from "../../models/school-model";
import {Schools} from "../../providers/schools";
import {Teachers} from "../../providers/teachers";
import {TeacherModel} from "../../models/teacher-model";
import {AuthData} from "../../providers/auth-data";

@Component({
    selector: '[teacher-list]',
    templateUrl: 'teacher-list.html',
    providers: [Schools, Translator]
})

export class TeacherListDirective {

    private teachers: Array<TeacherModel>
    private userId: string;
    private userRole: string;

    constructor(public teacherProvider: Teachers,
                public translator: Translator,
                private userProvider: AuthData) {
        console.log('TeacherListDirective: constructor()')
        this.userId = userProvider.getUserId();
        userProvider.getUser().then(user => {
            this.userRole = user.role
            this.loadTeachers()
        })
    }

    private loadTeachers() {
        if (this.userRole == "branch-admin") {
            this.teacherProvider.getBranchAdminTeachers().then(res => {
                this.teachers = res
            })
        }
        else if (this.userRole == "school-admin") {
            this.teacherProvider.getSchoolAdminTeachers().then(res => {
                this.teachers = res
            })
        }
    }

}
