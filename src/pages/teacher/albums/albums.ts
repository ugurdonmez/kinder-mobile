
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "@ngx-translate/core";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";
import {Parents} from "../../../providers/parents";
import {ParentModel} from "../../../models/parent-model";
import {AlbumModel} from "../../../models/album-model";
import {AlertController} from "ionic-angular";

@Component({
   selector: 'page-teacher-albums',
   templateUrl: 'albums.html',
})

export class TeacherAlbumsPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private selectedStudent: string;
   private albums: Promise<AlbumModel[]>;
   private students: ParentModel[];

   constructor(private galleryProvider: Gallery,
               public translator: Translator,
               public parentProvider: Parents,
               private alertCtrl: AlertController,
   ) {
      this.classId = '-Ketn4qOsNQOA0vSjZRC'
      this.parentProvider.getParentsOfClass(this.classId).then(students => {
         this.students = students
      })
      this.translate = translator.translatePipe;
      this.selectStudent('all')
   }

   private createAlbumClicked(){
      let prompt = this.alertCtrl.create({
         title: this.translate.instant('Create Album'),
         message: this.translate.instant("Enter a title for this new album"),
         inputs: [
            {
               name: 'title',
               placeholder: this.translate.instant('Title')
            },
         ],
         buttons: [
            {
               text: this.translate.instant('Cancel'),
               handler: data => {
                  // console.log('Cancel clicked');
               }
            },
            {
               text: this.translate.instant('Create'),
               handler: data => {
                  // console.log('albumName:');
                  // console.log(albumName);
                  this.galleryProvider.addAlbum(this.classId, data.title)
                  this.selectStudent('all')
               }
            }
         ]
      });
      prompt.present();
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
            // console.log('albums selectStudent imageIdsOfStudent:')
            // console.log(imageIdsOfStudent)
            let albumIds = []
            imageIdsOfStudent.forEach(imageIdOfStudent=> {
               this.galleryProvider.getImage(this.classId, imageIdOfStudent).then(image => {
                  // console.log('albums selectStudent image.albumId of student:')
                  // console.log(image.albumId)
                  // console.log('albums selectStudent albumIdArray:')
                  // console.log(albumIds)
                  if (!!image.albumId)
                     if (albumIds.indexOf(image.albumId) < 0)
                        albumIds.push(image.albumId)
               })
            })
            let result= this.galleryProvider.getAlbums(this.classId, albumIds)
            // console.log('albums selectStudent albums:')
            // console.log(result)
            return result
         })
      }

   }
}
