
import {Component} from '@angular/core';

import {BranchAdminTeacherPage} from "../teacher/teacher";
import {BranchAdminStudentPage} from "../student/student";
import {BranchAdminMePage} from "../me/me";
import {BranchAdminSchoolPage} from "../school/school";
import {BranchAdminClassPage} from "../class/class";

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
