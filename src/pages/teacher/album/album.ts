import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {NavController, NavParams} from "ionic-angular";
import {TeacherAlbumsPage} from "../albums/albums";
import {AlbumModel} from "../../../models/album-model";

@Component({
   selector: 'page-teacher-album',
   templateUrl: 'album.html',
})

export class TeacherAlbumPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private album: AlbumModel;
   private images: Promise<ImageModel[]>;
   private selectedStudent: string;
   private students: ParentModel[];

   constructor(public navCtrl: NavController,
               public translator: Translator,
               public parentProvider: Parents,
               private galleryProvider: Gallery,
               public navParams: NavParams,) {
      this.album = navParams.get('album');
      this.classId = navParams.get('classId');
      this.translate = translator.translatePipe;
      this.parentProvider.getParentsOfClass(this.classId).then(students => {
         this.students = students
      })
      this.selectStudent('all')
   }

   ngOnInit(): void {

   }

   private selectStudent(studentId: string): void {
      this.selectedStudent = studentId
      if (studentId == 'all') {
         this.images = this.galleryProvider.getImagesInAlbum(this.classId, this.album.id)
      }
      else {
         this.images = this.galleryProvider.getImageIdsOfStudent(this.classId, studentId).then(imageIdsOfStudent => {
            return this.galleryProvider.getImagesInAlbum(this.classId, this.album.id).then(imagesInAlbum => {
               let images = []
               imagesInAlbum.forEach(imageOfAlbum => {
                  // console.log('album page selectStudent imageOfAlbum:')
                  // console.log(imageOfAlbum)
                  // console.log('album page selectStudent imageIdsOfStudent:')
                  // console.log(imageIdsOfStudent)
                  // console.log('album page selectStudent indexof:')
                  // console.log(imageIdsOfStudent.indexOf(imageOfAlbum.id))
                  if(imageIdsOfStudent.indexOf(imageOfAlbum.id) != -1) {
                     images.push(imageOfAlbum)
                     // console.log('album page selectStudent if is true')
                  }
               })
               return images
            })
         })
      }

   }
}
