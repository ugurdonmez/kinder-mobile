import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {AlbumModel} from "../../../models/album-model";

@Component({
   selector: 'page-parent-album',
   templateUrl: 'album.html',
})

export class ParentAlbumPage implements OnInit {

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
               public navParams: NavParams,
               private alertCtrl: AlertController,
   ) {
      this.album = navParams.get('album');
      this.classId = navParams.get('classId');
      this.students = navParams.get('students');
      this.translate = translator.translatePipe;
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
                  if(imageIdsOfStudent.indexOf(imageOfAlbum.id) != -1) {
                     images.push(imageOfAlbum)
                  }
               })
               return images
            })
         })
      }

   }
}
