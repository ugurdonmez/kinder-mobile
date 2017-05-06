
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from "../teacher/teacher";
import {SchoolAdminStudentPage} from "../student/student";
import {SchoolAdminMePage} from "../me/me";


@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminTeacherPage
   tab2Root = SchoolAdminStudentPage
   tab3Root = SchoolAdminMePage

   constructor() {

   }
}
