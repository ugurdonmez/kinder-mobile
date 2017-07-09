
import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
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
