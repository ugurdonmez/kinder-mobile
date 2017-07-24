
import { Component, OnInit } from '@angular/core';
import { ParentModel } from "../../../models/parent-model";
import {NavController, NavParams} from "ionic-angular";
import { ClassModel } from "../../../models/class-model";
import { HomeworkProvider } from "../../../providers/homework-provider";
import {HomeworkModel} from "../../../models/homework-model";

@Component({
   selector: 'parent-homework-page',
   templateUrl: 'parent-homework.html',
   providers: []
})

export class ParentHomeworkPage implements OnInit {

   private parent: ParentModel
   private homeworks: Array<HomeworkModel>
   private class: ClassModel

   constructor(
      private navCtrl: NavController,
      private navParams: NavParams,
      private homeworkProvider: HomeworkProvider
   ) {

   }

   ngOnInit(): void {
      console.log('ParentHomeworkPage: onInit()')

      this.parent = this.navParams.get('parent')
      this.class = this.navParams.get('_class')
      this.homeworkProvider.getHomeworksNew(this.parent.id)
         .then(res => {
            this.homeworks = res
            console.log(this.homeworks)
         })
   }
}
