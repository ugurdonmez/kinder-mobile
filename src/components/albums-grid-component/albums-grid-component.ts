import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {TeacherViewPhotoPage} from "../../pages/teacher/view-photo/view-photo";
import {ImageModel} from "../../models/image-model";
import {AlbumModel} from "../../models/album-model";
import {TeacherAlbumPage} from "../../pages/teacher/album/album";

@Component({
  selector: 'albums-grid-component',
  templateUrl: 'albums-grid-component.html',
    providers: [Translator]
})


export class AlbumsGridComponent implements OnInit{
    @Input() albums: AlbumModel[];
    @Input() role: string;
    @Input() classId: string;
    private translate: TranslateService;


    constructor(public navCtrl: NavController,
                public translator: Translator,
    ) {

    }

    ngOnInit(): void {
        this.translate = this.translator.translatePipe;
    }

    private openAlbumPage(album){
       if(this.role == 'teacher'){
          this.navCtrl.push(TeacherAlbumPage, {classId: this.classId, album: album})
       }
    }

}
