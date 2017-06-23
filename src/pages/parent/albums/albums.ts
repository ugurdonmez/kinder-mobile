
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {AlbumModel} from "../../../models/album-model";
import {AlertController, NavParams} from "ionic-angular";

@Component({
   selector: 'page-parent-albums',
   templateUrl: 'albums.html',
})

export class ParentAlbumsPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private selectedStudent: string;
   private albums: Promise<AlbumModel[]>;
   private students: ParentModel[];

   constructor(private galleryProvider: Gallery,
               public translator: Translator,
               public parentProvider: Parents,
               private alertCtrl: AlertController,
               private navParams: NavParams
   ) {
      this.classId = navParams.get('classId');
      this.students = navParams.get('students');
      this.translate = translator.translatePipe;
      this.selectStudent('all')
   }

   ngOnInit(): void {

   }

   private selectStudent(studentId: string): void {
      // console.log('select student')
      // console.log(studentId)

      this.selectedStudent = studentId
      if (studentId == 'all'){
         this.albums = this.galleryProvider.getAllAlbums(this.classId)
      }
      else{
         this.albums = this.galleryProvider.getImageIdsOfStudent(this.classId, studentId).then(imageIdsOfStudent => {
            let albumIds = []
            imageIdsOfStudent.forEach(imageIdOfStudent=> {
               this.galleryProvider.getImage(this.classId, imageIdOfStudent).then(image => {
                  if (!!image.albumId)
                     if (albumIds.indexOf(image.albumId) < 0)
                        albumIds.push(image.albumId)
               })
            })
            let result= this.galleryProvider.getAlbums(this.classId, albumIds)
            return result
         })
      }

   }
}
