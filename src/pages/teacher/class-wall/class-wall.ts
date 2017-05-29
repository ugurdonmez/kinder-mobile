import {Component, OnInit} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {Classes} from "../../providers/classes";
import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Teachers} from "../../providers/teachers";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {Attendance} from "../../providers/attendance";
import {Message} from "../../providers/message";
import {HumanReadableDateTime} from "../../helpers/humanReadableDateTime";
import {Translator} from "../../../app/translator";

@Component({
  selector: 'class-wall',
  templateUrl: 'class-wall.html',
    providers: [Translator]
})


export class TeacherClassWallPage implements OnInit{
    private classId: string;
    private translate: TranslateService;

    constructor(private navParams: NavParams, public translator: Translator) {
        this.translate = translator.translatePipe;
        this.classId = navParams.get('classId');
    }

    ngOnInit(): void {

    }
}
