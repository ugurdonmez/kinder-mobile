import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClassModel } from '../../models/class-model';
// import { TeacherModel } from '../../models/teacher-model';
import { Classes } from '../../providers/classes';
import { Teachers } from '../../providers/teachers';
import {Validators, FormBuilder} from "@angular/forms";
import {IntegerValidator} from '../../validators/integer';


@Component({
    selector: 'page-school-admin-add-update-class',
    templateUrl: 'school-admin-add-update-class.html',
    providers: [Classes, Teachers]
})

export class SchoolAdminAddUpdateClassPage {
    randomMockClass: ClassModel;
    classDetailsForm: any;
    allTeachers: any;

    constructor(public navCtrl: NavController, public classProvider: Classes, public formBuilder: FormBuilder,
                public teacherProvider: Teachers) {
        this.classDetailsForm = formBuilder.group(
            {
                'name': ['', Validators.minLength(1)],
                'teacher_id': ['', Validators.minLength(1)],
                'current': [0],
                'age': [, Validators.compose([IntegerValidator.isValid, Validators.minLength(1)])],
                'maximum': [, Validators.compose([IntegerValidator.isValid, Validators.minLength(1)])]
            }
        );
        this.allTeachers = this.teacherProvider.getAllTeachers();
        // console.log(this.teacher);
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateClassPage Page');
    }

    addNewClass(){
        this.classDetailsForm.value.age = Number(this.classDetailsForm.value.age);
        this.classDetailsForm.value.maximum = Number(this.classDetailsForm.value.maximum);
        //console.log(this.classDetailsForm.value);
        var classId = this.classProvider.addClass(this.classDetailsForm.value);
        var teacherId = this.classDetailsForm.value.teacher_id;
        this.teacherProvider.addClassToTeacher(teacherId, classId);
    }

    classProviderTests(){
        // getClass test
        console.log(this.classProvider.getClass("-KaSzyajwg5kuPNpFRpp"));

        // updateClass test
        this.generateRandomMockClass();
        this.randomMockClass.id = "-KaSzyajwg5kuPNpFRpp";
        this.classProvider.updateClass(this.randomMockClass);

        // addClass test
        this.generateRandomMockClass();
        this.classProvider.addClass(this.randomMockClass);

        // getUserClasses test
        this.classProvider.getUserClasses(function(userClassArray){
            console.log(userClassArray)
        })
    }

    private generateRandomMockClass() {
        this.randomMockClass = new ClassModel();
        this.randomMockClass.name = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
        this.randomMockClass.teacher_id = "mockTeacherId";
        this.randomMockClass.teacher_name = "Mock Ogretmen";
        this.randomMockClass.age = 6;
        this.randomMockClass.current = 15;
        this.randomMockClass.maximum = 50;
    }
}
