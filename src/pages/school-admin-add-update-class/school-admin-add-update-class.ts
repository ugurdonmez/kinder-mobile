import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ClassModel } from '../../models/class-model';
import { Classes } from '../../providers/classes';


@Component({
    selector: 'page-school-admin-add-update-class',
    templateUrl: 'school-admin-add-update-class.html',
    providers: [Classes]
})

export class SchoolAdminAddUpdateClassPage {
    randomMockClass: ClassModel = new ClassModel();

    constructor(public navCtrl: NavController, public classesProvider: Classes) {
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateClassPage Page');
    }

    addNewClass(){
        //addClass test
        this.generateRandomMockClass();
        this.classesProvider.addClass(this.randomMockClass);

        //getClass test
        console.log(this.classesProvider.getClass("-KaSzyajwg5kuPNpFRpp"));

        //updateClass test
        this.generateRandomMockClass();
        this.randomMockClass.id = "-KaSzyajwg5kuPNpFRpp";
        this.classesProvider.updateClass(this.randomMockClass);

        //getUserClasses test
        this.classesProvider.getUserClasses(function(userClassArray){
            console.log(userClassArray)
        })
    }

    private generateRandomMockClass() {
        this.randomMockClass.name = (function(n){return eval("["+Array(n).join("String.fromCharCode(65+~~(Math.random()*61)),")+",'']").join("");}(8));
        this.randomMockClass.teacher_id = "mockTeacherId";
        this.randomMockClass.teacher_name = "Mock Ogretmen";
        this.randomMockClass.age = 6;
        this.randomMockClass.current = 15;
        this.randomMockClass.maximum = 50;
    }
}
