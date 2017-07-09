import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {AlbumModel} from "../../models/album-model";
import {ParentAlbumPage} from "../../pages/parent/album/album";
import {ParentModel} from "../../models/parent-model";

@Component({
   selector: 'parent-albums-grid-component',
   templateUrl: 'parent-albums-grid-component.html',
   providers: [Translator]
})


export class ParentAlbumsGridComponent implements OnInit {
   @Input() albums: AlbumModel[];
   @Input() role: string;
   @Input() classId: string;
   @Input() students: ParentModel[];
   private translate: TranslateService;

   constructor(public navCtrl: NavController,
               public translator: Translator,) {

   }

   ngOnInit(): void {
      this.translate = this.translator.translatePipe;
   }

   private openAlbumPage(album) {
      if (this.role == 'parent') {
         this.navCtrl.push(ParentAlbumPage, {classId: this.classId, album: album, students: this.students})
      }
   }
}
