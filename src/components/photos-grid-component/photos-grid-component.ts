import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {InviteOthersPage} from "../invite-others/invite-others";

@Component({
  selector: 'photos-grid-component',
  templateUrl: 'photos-grid-component.html',
    providers: [Translator]
})


export class PhotosGridComponent implements OnInit{
    @Input() photos: any;
    private translate: TranslateService;


    constructor(public navCtrl: NavController,
                public translator: Translator,
    ) {

    }

    ngOnInit(): void {
        this.translate = this.translator.translatePipe;


    }

}
