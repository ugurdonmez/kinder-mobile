import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {ParentModel} from "../../models/parent-model";
import {ImageModel} from "../../models/image-model";

@Component({
  selector: 'view-photo-component',
  templateUrl: 'view-photo-component.html',
    providers: [Translator]
})


export class ViewPhotoComponent implements OnInit{
    @Input() photo: ImageModel;
    @Input() classId: string;
    private translate: TranslateService;
   private students: Promise<ParentModel[]>;


    constructor(public navCtrl: NavController,
                public translator: Translator,
                private parentProvider: Parents,
    ) {

    }

    ngOnInit(): void {
       console.log('ViewPhotoComponent class id is:')
       console.log(this.classId)
        this.translate = this.translator.translatePipe;
        this.students = this.parentProvider.getParentsOfClass(this.classId)
       console.log('ViewPhotoComponent students:')
       console.log(this.students)
    }


}
