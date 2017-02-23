import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Classes } from '../../providers/classes';

import { ClassModel } from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {IntegerValidator} from "../../validators/integer";
import {Teachers} from "../../providers/teachers";


@Component({
  selector: 'page-school-admin-edit-class',
  templateUrl: 'school-admin-edit-class.html',
    providers: [Classes, Translator, Teachers]
})

export class SchoolAdminEditClassPage {
    classes: Array<ClassModel> = [];
    translate: TranslateService;
    classDetailsForm: any;
    _class: any;
    classId: string;
    allTeachers: any;


    constructor(public navCtrl: NavController, public classesProvider: Classes, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, private navParams: NavParams,
                private teacherProvider: Teachers) {
        this.classId = navParams.get('classId');
        this._class = this.classesProvider.getClass(this.classId);
        this.translate = translator.translatePipe;
        this.allTeachers = this.teacherProvider.getAllTeachers();

        this._class.subscribe(snapshot => {
            this.classDetailsForm = formBuilder.group(
                {
                    'id': [this.classId, Validators.required],
                    'name': [snapshot.name, Validators.required],
                    'teacher_id': [snapshot.teacher_id, Validators.minLength(1)],
                    'current': [snapshot.current],
                    'age': [snapshot.age, IntegerValidator.isValid],
                    'maximum': [snapshot.maximum, IntegerValidator.isValid],
                    'schoolId': [snapshot.schoolId]
                }
            );
        });


    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateClassPage Page');
    }

    updateClass(){
        if (this.classDetailsForm.valid){
            this.classesProvider.updateClass(this.classDetailsForm.value);
            this.navCtrl.pop();
        }
        else{
            let alert = this.alertCtrl.create({
                title: this.translate.instant('Cannot Submit!'),
                subTitle: this.translate.instant('At least one of the fields are not valid.'),
                buttons: [this.translate.instant('OK')]
            });
            alert.present();
        }
    }

    deleteClass(){
    let confirm = this.alertCtrl.create({
        title: this.translate.instant('Delete Class?'),
        message: this.translate.instant('Sure you want to delete this class? A delete operation is irreversible.'),
        buttons: [
            {
                text: this.translate.instant('Cancel'),
                handler: () => {
                }
            },
            {
                text: this.translate.instant('Ok'),
                handler: () => {
                    this.classesProvider.deleteClass(this.classId);
                    this.navCtrl.pop();
                    this.navCtrl.pop();
                }
            }
        ]
    });
    confirm.present();

    }
}
