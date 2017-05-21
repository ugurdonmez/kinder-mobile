
import {Component} from '@angular/core';

import {BranchAdminTeacherPage} from "../teacher-tab/teacher-tab";
import {BranchAdminStudentPage} from "../student-tab/student-tab";
import {BranchAdminMePage} from "../me-tab/me-tab";
import {BranchAdminSchoolPage} from "../school-tab/school-tab";
import {BranchAdminClassPage} from "../class-tab/class-tab";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class BranchAdminHomePage {

   tab1Root = BranchAdminSchoolPage
   tab2Root = BranchAdminTeacherPage
   tab3Root = BranchAdminClassPage
   tab4Root = BranchAdminStudentPage
   tab5Root = BranchAdminMePage

   constructor() {

   }
}
