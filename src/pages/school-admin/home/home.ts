
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from "../teacher/teacher";
import {SchoolAdminStudentPage} from "../student/student";
import {SchoolAdminMePage} from "../me/me";
import {SchoolAdminClassPage} from "../class/class";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminTeacherPage
   tab2Root = SchoolAdminClassPage
   tab3Root = SchoolAdminStudentPage
   tab4Root = SchoolAdminMePage

   constructor() {

   }
}
