
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from '../teacher/teacher';
import {SchoolAdminMePage} from '../me/me';
import {SchoolAdminBranchPage} from '../branch/branch';
import {SchoolAdminStudentPage} from '../student/student';

import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";
import {Schools} from "../../../providers/schools";
import {Classes} from "../../../providers/classes";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminBranchPage
   tab2Root = SchoolAdminTeacherPage
   tab3Root = SchoolAdminStudentPage
   tab4Root = SchoolAdminMePage

   constructor(private schoolProvider: Schools, private classProvider: Classes) {
       // this.runSchoolProviderTests();
       // this.runClassProviderTests();
   }

   private runSchoolProviderTests() {
      // schoolProvider.getUserSchools() Test
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

    private runClassProviderTests() {
        // classProvider.getClass() Test
        console.log('classProvider.getClass() Test raw:')
        console.log(this.classProvider.getClass('-Ketn4qOsNQOA0vSjZRC'))
        this.classProvider.getClass('-Ketn4qOsNQOA0vSjZRC')
            .then(response => {
                console.log('classProvider.getClass() Test with subscribe:')
                console.log(response)
            })

        // classProvider.getClassesOfSchool() Test
        console.log('classProvider.getClassesOfSchool() Test raw:')
        console.log(this.classProvider.getClassesOfSchool("-KcBQgVP7Jx6HISaZAjG"))
        this.classProvider.getClassesOfSchool("-KcBQgVP7Jx6HISaZAjG")
            .then(response => {
                console.log('classProvider.getClassesOfSchool() Test with subscribe:')
                console.log(response)
            })

        // classProvider.getClassesOfTeacher() Test
        console.log('classProvider.getClassesOfTeacher() Test raw:')
        console.log(this.classProvider.getClassesOfTeacher("Kmm96bCQeNdE8uU6YwI9cfzbb232"))
        this.classProvider.getClassesOfTeacher("Kmm96bCQeNdE8uU6YwI9cfzbb232")
            .then(response => {
                console.log('classProvider.getClassesOfTeacher() Test with subscribe:')
                console.log(response)
            })
    }
}
