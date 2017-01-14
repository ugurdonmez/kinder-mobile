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
    randomMockClass: ClassModel;

    constructor(public navCtrl: NavController, public _class: Classes) {
    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateClassPage Page');
    }

    addNewClass(){
        //getClass test
        console.log(this._class.getClass("-KaSzyajwg5kuPNpFRpp"));

        //updateClass test
        this.generateRandomMockClass();
        this.randomMockClass.id = "-KaSzyajwg5kuPNpFRpp";
        this._class.updateClass(this.randomMockClass);

        //addClass test
        this.generateRandomMockClass();
        this._class.addClass(this.randomMockClass);

        //getUserClasses test
        this._class.getUserClasses(function(userClassArray){
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
