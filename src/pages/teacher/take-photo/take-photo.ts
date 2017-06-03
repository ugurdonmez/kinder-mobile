
import {Component, OnInit} from '@angular/core';
import {Gallery} from "../../../providers/gallery";
import {TranslateService} from "ng2-translate";
import {Translator} from "../../../app/translator";
import {NavParams} from "ionic-angular";

@Component({
   selector: 'page-teacher-take-photo',
   templateUrl: 'take-photo.html',
})

export class TeacherTakePhotoPage implements OnInit {

   private translate: TranslateService;
   private classId: string;

   constructor(public translator: Translator,
               public navParams: NavParams,
   ) {
      this.translate = translator.translatePipe;
      this.classId = navParams.get('classId');

   }

   ngOnInit(): void {

   }
}
