
import { Component, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate";
import { Translator } from "../../../app/translator";

@Component({
   selector: 'page-teacher-parent',
   templateUrl: 'teacher-parent.page.html',
})

export class TeacherParentPage implements OnInit {

   private translate: TranslateService;

   constructor(
      public translator: Translator,
   ) {

   }

   ngOnInit(): void {

   }
}
