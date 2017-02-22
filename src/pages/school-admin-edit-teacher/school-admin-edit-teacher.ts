import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Teachers } from '../../providers/teachers';

import { ClassModel } from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'page-school-admin-edit-teacher',
  templateUrl: 'school-admin-edit-teacher.html',
    providers: [Teachers, Translator]
})

export class SchoolAdminEditTeacherPage {
    classes: Array<ClassModel> = [];
    translate: TranslateService;
    teacherDetailsForm: any;
    teacher: any;
    teacherId: string;


    constructor(public navCtrl: NavController, public teachersProvider: Teachers, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, private navParams: NavParams) {
        this.teacherId = navParams.get('teacherId');
        this.teacher = this.teachersProvider.getTeacher(this.teacherId);
        this.translate = translator.translatePipe;

        this.teacher.subscribe(snapshot => {
            this.teacherDetailsForm = formBuilder.group(
                {
                    'id': [this.teacherId, Validators.required],
                    'name': [snapshot.name, Validators.required],
                    'surname': [snapshot.surname, Validators.required],
                    'notes': [snapshot.notes]
                }
            );
        });

    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
    }

    newPhoto(){
        this.teachersProvider.newPhoto(this.teacherId);
    }

    updateTeacher(){
        if (this.teacherDetailsForm.valid){
            this.teachersProvider.updateTeacher(this.teacherDetailsForm.value);
            this.navCtrl.pop();
        }
        else{
            let alert = this.alertCtrl.create({
                title: 'Cannot Submit!',
                subTitle: 'At least one of the fields are not valid.',
                buttons: ['OK']
            });
            alert.present();
        }
    }

    deleteTeacher(){
    let confirm = this.alertCtrl.create({
        title: 'Delete Teacher?',
        message: 'Sure you want to delete this teacher? A delete operation is irreversible.',
        buttons: [
            {
                text: 'Cancel',
                handler: () => {
                }
            },
            {
                text: 'Ok',
                handler: () => {
                    this.teachersProvider.deleteTeacher(this.teacherId);
                    this.navCtrl.pop();
                    this.navCtrl.pop();
                }
            }
        ]
    });
    confirm.present();

    }
}
