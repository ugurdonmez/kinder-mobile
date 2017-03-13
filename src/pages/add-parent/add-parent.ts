import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder} from "@angular/forms";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {HomePage} from "../home/home";
import {Parents} from "../../providers/parents";
import {SchoolAdminClassDetailsPage} from "../school-admin-class-details/school-admin-class-details";


@Component({
  selector: 'page-add-parent',
  templateUrl: 'add-parent.html',
    providers: [Translator, Parents]
})
export class AddParentPage {
    private translate: TranslateService;
    private classId: string;
    private parentDetailsForm: any;
    private parentId: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public translator: Translator, private navParams: NavParams, private parentsProvider: Parents) {
      this.translate = translator.translatePipe;
      this.classId = navParams.get('classId');
      this.parentDetailsForm = formBuilder.group(
          {
              'parentName': ['', Validators.minLength(1)],
              'parentSurname': ['', Validators.minLength(1)],
              'parentTelephone': ['', Validators.minLength(1)],
              'studentName': ['', Validators.minLength(1)],
              'studentSurname': ['', Validators.minLength(1)],
              'studentAddress': ['', Validators.minLength(1)],
              'classId': [this.classId, Validators.required]
          }
      );

  }

  ionViewDidLoad() {
    console.log('Hello SchoolAdminAddUpdateTeacherPage Page');
  }

    newPhoto(){
        this.parentsProvider.newPhoto(this.parentId);
    }

    addNewTeacher(){
        // this.teacherId = this.teachersProvider.addTeacher(this.teacherDetailsForm.value);
        this.parentId = this.parentsProvider.addParent(this.parentDetailsForm.value);
        this.newPhoto();
        // this.navCtrl.pop();
        this.navCtrl.setRoot(SchoolAdminClassDetailsPage, {
            'classId': this.classId
        })
    }

}
