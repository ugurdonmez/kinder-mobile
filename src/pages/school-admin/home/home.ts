
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from "../teacher-tab/teacher-tab";
import {SchoolAdminStudentPage} from "../student-tab/student-tab";
import {SchoolAdminMePage} from "../me-tab/me-tab";
import {SchoolAdminClassPage} from "../class-tab/class-tab";

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
