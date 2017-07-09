import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {TeacherViewPhotoPage} from "../../pages/teacher/view-photo/view-photo";
import {ImageModel} from "../../models/image-model";

@Component({
  selector: 'photos-grid-component',
  templateUrl: 'photos-grid-component.html',
    providers: [Translator]
})


export class PhotosGridComponent implements OnInit{
    @Input() photos: ImageModel;
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

    private openViewImagePage(photo){
       if(this.role == 'teacher'){
          this.navCtrl.push(TeacherViewPhotoPage, {classId: this.classId, photo: photo})
       }
    }

}
