import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {ParentModel} from "../../models/parent-model";
import {ImageModel} from "../../models/image-model";
import {Gallery} from "../../providers/gallery";
import {AlbumModel} from "../../models/album-model";

@Component({
   selector: 'parent-view-photo-component',
   templateUrl: 'parent-view-photo-component.html',
   providers: [Translator]
})


export class ParentViewPhotoComponent implements OnInit {
   @Input() photo: ImageModel;
   @Input() classId: string;
   @Input() role: string;
   private translate: TranslateService;
   private students: Promise<ParentModel[]>;
   private isStudentTaggedDictionary: {};
   private allAlbums: Promise<AlbumModel[]>;
   private selectedAlbumId: string;


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
      this.allAlbums = this.galleryProvider.getAllAlbums(this.classId)
      this.selectedAlbumId = this.photo.albumId
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
}
