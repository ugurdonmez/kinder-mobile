import { Component } from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import { Schools } from '../../providers/schools';

import { ClassModel } from '../../models/class-model';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home-old/home";
import {AuthData} from "../../providers/auth-data";
// import {EmailValidator} from "../../validators/email";


@Component({
  selector: 'page-school-admin-edit-school',
  templateUrl: 'school-admin-edit-school.html',
    providers: [Schools, Translator, AuthData]
})

export class SchoolAdminEditSchoolPage {
    classes: Array<ClassModel> = [];
    translate: TranslateService;
    schoolDetailsForm: any;
    school: any;
    schoolId: string;


    constructor(public navCtrl: NavController, public schoolsProvider: Schools, public formBuilder: FormBuilder,
                public translator: Translator, public alertCtrl: AlertController, private navParams: NavParams,
                private authData: AuthData) {
        this.schoolId = navParams.get('schoolId');
        this.school = this.schoolsProvider.getSchool(this.schoolId);
        this.translate = translator.translatePipe;

        this.school.subscribe(snapshot => {
            this.schoolDetailsForm = formBuilder.group(
                {
                    'activationEmail': [snapshot.activationEmail, Validators.required],
                    'buildingAddress': [snapshot.buildingAddress, Validators.required],
                    'id': [this.schoolId, Validators.required],
                    'branchId': [snapshot.branchId, Validators.required],
                    'isActivated': [snapshot.isActivated, Validators.required],
                    'managerName': [snapshot.managerName, Validators.required],
                    'managerTel': [snapshot.managerTel, Validators.required],
                    'name': [snapshot.name, Validators.required],
                    'schoolTelephone': [snapshot.schoolTelephone, Validators.required],
                    'secondContactPersonName': [snapshot.secondContactPersonName],
                    'secondContactTelNo': [snapshot.secondContactTelNo],
                    'adminUserId': [snapshot.adminUserId]
                }
            );
        });

    }

    ionViewDidLoad() {
        console.log('Hello SchoolAdminEditSchoolPage Page');
    }

    newPhoto(){
        this.schoolsProvider.newPhoto(this.schoolId);
    }

    updateSchool(){
        if (this.schoolDetailsForm.valid){
            this.schoolsProvider.updateSchool(this.schoolDetailsForm.value);
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

    deleteSchool(){
    let confirm = this.alertCtrl.create({
        title: this.translate.instant('Delete School?'),
        message: this.translate.instant('Sure you want to delete this school? This will also remove the classes in this school. A delete operation is irreversible.'),
        buttons: [
            {
                text: this.translate.instant('Cancel'),
                handler: () => {
                }
            },
            {
                text: this.translate.instant('Ok'),
                handler: () => {
                    this.schoolsProvider.deleteSchool(this.schoolId);
                    this.authData.getUser().subscribe( snapshot => {
                        if(snapshot.role == "school-admin"){//user is school admin
                            this.navCtrl.setRoot(HomePage);
                        }
                        else{
                            this.navCtrl.pop();
                            this.navCtrl.pop();
                        }
                    });
                }
            }
        ]
    });
    confirm.present();

    }
}
