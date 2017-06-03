
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {NavParams} from "ionic-angular";
import {ImageModel} from "../../../models/image-model";

@Component({
   selector: 'page-teacher-view-photo',
   templateUrl: 'view-photo.html',
})

export class TeacherViewPhotoPage implements OnInit {

   private translate: TranslateService;
   private classId: string;
   private photo: ImageModel;

   constructor(public translator: Translator,
               public navParams: NavParams,
   ) {
      this.translate = translator.translatePipe;
      this.classId = navParams.get('classId');
      this.photo = navParams.get('photo');
      console.log('TeacherViewPhotoPage photo is:')
      console.log(this.photo)
   }

   ngOnInit(): void {

   }
}
