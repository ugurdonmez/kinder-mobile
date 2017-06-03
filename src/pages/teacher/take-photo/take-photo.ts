
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";

@Component({
   selector: 'page-teacher-take-photo',
   templateUrl: 'take-photo.html',
})

export class TeacherTakePhotoPage implements OnInit {

   private translate: TranslateService;

   constructor(private galleryProvider: Gallery,
               public translator: Translator,
   ) {
      this.translate = translator.translatePipe;

   }

   ngOnInit(): void {

   }
}
