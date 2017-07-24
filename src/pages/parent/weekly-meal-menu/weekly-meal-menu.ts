
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {ClassModel} from "../../../models/class-model";

@Component({
   selector: 'parent-weekly-meal-menu-page',
   templateUrl: 'weekly-meal-menu.html',
   providers: []
})

export class ParentWeeklyMealMenuPage implements OnInit {
   private _class: ClassModel;

   constructor(
      private navParams: NavParams,
   ) {
      this._class = navParams.get('_class');
   }

   ngOnInit(): void {
   }

}
