
import {Component, OnInit} from "@angular/core";
import {Translator} from "../../../app/translator";
import {NavParams} from "ionic-angular";

@Component({
   selector: 'parent-daily-feedback-parent',
   templateUrl: 'parent-daily-feedback-parent.html',
   providers: [Translator]
})

export class ParentDailyFeedbackParent implements OnInit {

   constructor(
      public navParams: NavParams,
   ) {

   }

   private myDate:string

   ngOnInit(): void {
      this.myDate = new Date().toISOString();
   }
}
