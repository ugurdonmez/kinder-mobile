
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from '../teacher/teacher';
import {SchoolAdminMePage} from '../me/me';
import {SchoolAdminBranchPage} from '../branch/branch';
import {SchoolAdminStudentPage} from '../student/student';

import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";
import {Schools} from "../../../providers/schools";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminBranchPage
   tab2Root = SchoolAdminTeacherPage
   tab3Root = SchoolAdminStudentPage
   tab4Root = SchoolAdminMePage

   constructor(private schoolProvider: Schools) {
      this.runTests();

   }

   private runTests() {
      // branchProvider.getUserSchools() Test
      console.log('schoolProvider.getUserSchools() Test raw:')
      console.log(this.schoolProvider.getUserSchools())
      this.schoolProvider.getUserSchools()
          .then(response => {
             console.log('schoolProvider.getUserSchools() Test with subscribe:')
             console.log(response)
          })

      // schoolProvider.getSchoolsOfBranch() Test
      console.log('schoolProvider.getSchoolsOfBranch() Test raw:')
      console.log(this.schoolProvider.getSchoolsOfBranch("-KaEb4P-cddA6VHNoMOW"))
      this.schoolProvider.getSchoolsOfBranch("-KaEb4P-cddA6VHNoMOW")
          .then(response => {
             console.log('schoolProvider.getSchoolsOfBranch() Test with subscribe:')
             console.log(response)
          })

      // schoolProvider.getAllSchools() Test
      console.log('schoolProvider.getAllSchools() Test raw:')
      console.log(this.schoolProvider.getAllSchools())
      this.schoolProvider.getAllSchools()
          .then(response => {
             console.log('schoolProvider.getAllSchools() Test with subscribe:')
             console.log(response)
          })

      // schoolProvider.getSchool() Test
      console.log('schoolProvider.getSchool() Test raw:')
      console.log(this.schoolProvider.getSchool('-KcBQ6jMFDopvvJ0muK9'))
      this.schoolProvider.getSchool('-KcBQ6jMFDopvvJ0muK9')
          .then(response => {
             console.log('schoolProvider.getSchool() Test with subscribe:')
             console.log(response)
          })



   }
}
