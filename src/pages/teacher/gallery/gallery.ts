
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {ImageModel} from "../../../models/image-model";

@Component({
   selector: 'page-teacher-gallery',
   templateUrl: 'gallery.html',
})

export class TeacherGalleryPage implements OnInit {

   private translate: TranslateService;
   private photos: Promise<ImageModel[]>;

   constructor(private galleryProvider: Gallery,
               public translator: Translator,
   ) {
      this.translate = translator.translatePipe;
      this.photos = this.galleryProvider.getImagesOfClass('-Ketn4qOsNQOA0vSjZRC')
   }

   ngOnInit(): void {

   }
}
