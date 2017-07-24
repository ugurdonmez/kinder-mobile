
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "@ngx-translate/core";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {NavController} from "ionic-angular";
import {ParentAlbumsPage} from "../albums/albums";
import {AuthData} from "../../../providers/auth-data";

@Component({
   selector: 'page-parent-gallery',
   templateUrl: 'gallery.html',
})

export class ParentGalleryPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private selectedStudent: string;
   private photos: Promise<ImageModel[]>;
   private students: ParentModel[];
   private parentId: string;
   // private photos: ImageModel[];

   constructor(public navCtrl: NavController,
               private galleryProvider: Gallery,
               public translator: Translator,
               public parentProvider: Parents,
               public authDataProvider: AuthData,
   ) {
      this.classId = '-Ketn4qOsNQOA0vSjZRC'
      this.parentId = this.authDataProvider.getUserId()
      this.parentProvider.getParent(this.parentId).then(student => {
         this.students = [student]
      })
      this.translate = translator.translatePipe;
      // this.photos = this.galleryProvider.getImagesOfClass(this.classId)
      this.selectStudent('all')
   }

   ngOnInit(): void {

   }

   private openAlbumsPage(){
      this.navCtrl.push(ParentAlbumsPage, {classId: this.classId, students: this.students})
   }

   private selectStudent(studentId: string): void {

      this.selectedStudent = studentId
      if (studentId == 'all'){
         this.photos = this.galleryProvider.getImagesOfClass(this.classId)
         //    .then(result => {
         //     result;
         // })
      }
      else{
         this.photos = this.galleryProvider.getImageIdsOfStudent(this.classId, studentId).then(imageIds => {
            let photos = []
            imageIds.forEach(imageId=> {
               this.galleryProvider.getImage(this.classId, imageId).then(photo => {
                  photos.push(photo)
               })
            })
            return photos
         })
      }
   }
}
