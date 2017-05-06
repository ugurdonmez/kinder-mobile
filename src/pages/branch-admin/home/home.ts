
import {Component} from '@angular/core';

import {BranchAdminTeacherPage} from "../teacher/teacher";
import {BranchAdminStudentPage} from "../student/student";
import {BranchAdminMePage} from "../me/me";
import {BranchAdminSchoolPage} from "../school/school";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class BranchAdminHomePage {

   tab1Root = BranchAdminSchoolPage
   tab2Root = BranchAdminTeacherPage
   tab3Root = BranchAdminStudentPage
   tab4Root = BranchAdminMePage

   constructor() {

   }
}
