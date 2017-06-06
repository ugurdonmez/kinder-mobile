import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {ParentModel} from "../../models/parent-model";
import {ImageModel} from "../../models/image-model";
import {Gallery} from "../../providers/gallery";

@Component({
   selector: 'view-photo-component',
   templateUrl: 'view-photo-component.html',
   providers: [Translator]
})


export class ViewPhotoComponent implements OnInit {
   @Input() photo: ImageModel;
   @Input() classId: string;
   private translate: TranslateService;
   private students: Promise<ParentModel[]>;
   private isStudentTaggedDictionary: {};


   constructor(public navCtrl: NavController,
               public translator: Translator,
               private parentProvider: Parents,
               private galleryProvider: Gallery,) {

   }

   ngOnInit(): void {
      console.log('ViewPhotoComponent class id is:')
      console.log(this.classId)
      this.translate = this.translator.translatePipe;
      this.students = this.parentProvider.getParentsOfClass(this.classId)
      this.isStudentTaggedDictionary = {}
      this.loadStudentsTaggedInThisImage()
   }

   private loadStudentsTaggedInThisImage() {
      this.students.then(students => {
         students.forEach(student => {
            this.isStudentTagged(student.id).then(isTagged => {
               this.isStudentTaggedDictionary[student.id] = isTagged
            })
         })
      })
   }

   isStudentTagged(studentId) {
      return this.galleryProvider.isStudentTaggedInImage(this.classId, this.photo.id, studentId)
   }

   tagStudent(studentId) {
      this.galleryProvider.tagStudentInImage(this.classId, this.photo.id, studentId)
      this.loadStudentsTaggedInThisImage()
   }

   untagStudent(studentId) {
      this.galleryProvider.untagStudentInImage(this.classId, this.photo.id, studentId)
      this.loadStudentsTaggedInThisImage()
   }
}
