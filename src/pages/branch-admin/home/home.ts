
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from '../teacher/teacher';
import {SchoolAdminMePage} from '../me/me';
import {SchoolAdminBranchPage} from '../branch/branch';
import {SchoolAdminStudentPage} from '../student/student';

import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminBranchPage
   tab2Root = SchoolAdminTeacherPage
   tab3Root = SchoolAdminStudentPage
   tab4Root = SchoolAdminMePage

   constructor() {

   }
}
