
import {Component} from '@angular/core';

import {SchoolAdminTeacherPage} from '../teacher/teacher';
import {SchoolAdminMePage} from '../me/me';
import {SchoolAdminBranchPage} from '../branch/branch';
import {SchoolAdminStudentPage} from '../student/student';

import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";
import {Schools} from "../../../providers/schools";
import {Classes} from "../../../providers/classes";
import {Parents} from "../../../providers/parents";
import {Teachers} from "../../../providers/teachers";
import {Activity} from "../../../providers/activity";
import {WeeklyActivity} from "../../../providers/weeklyactivity";
import {Invitation} from "../../../providers/invitation";

@Component({
   selector: 'page-school-admin-home',
   templateUrl: 'home.html',
})

export class SchoolAdminHomePage {

   tab1Root = SchoolAdminBranchPage
   tab2Root = SchoolAdminTeacherPage
   tab3Root = SchoolAdminStudentPage
   tab4Root = SchoolAdminMePage

   constructor(private schoolProvider: Schools, private classProvider: Classes, private parentProvider: Parents,
   private teacherProvider: Teachers, private weeklyActivityProvider: WeeklyActivity, private activityProvider: Activity,
   private invitationProvider: Invitation) {
       // this.runSchoolProviderTests();
       // this.runClassProviderTests();
       // this.runParentProviderTests();
       // this.runTeacherProviderTests();
       // this.runWeeklyActivityProviderTests();
       // this.runActivityProviderTests();
       // this.runInvitationProviderTests();
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

    private runParentProviderTests() {
        // parentProvider.getParent() Test
        console.log('parentProvider.getParent() Test raw:')
        console.log(this.parentProvider.getParent("10qFn2d6daV17ZIt5QAIPpmv4G93"))
        this.parentProvider.getParent("10qFn2d6daV17ZIt5QAIPpmv4G93")
            .then(response => {
                console.log('parentProvider.getParent() Test with subscribe:')
                console.log(response)
            })

        // parentProvider.getParentsOfClass() Test
        console.log('parentProvider.getParentsOfClass() Test raw:')
        console.log(this.parentProvider.getParentsOfClass("-Ketn4qOsNQOA0vSjZRC"))
        this.parentProvider.getParentsOfClass("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('parentProvider.getParentsOfClass() Test with subscribe:')
                console.log(response)
            })

    }

    private runTeacherProviderTests() {
        console.log('teacherProvider.getTeacher() Test raw:')
        console.log(this.teacherProvider.getTeacher("0eUDFB4h8WdpQwWmxPzcngGDR7a2"))
        this.teacherProvider.getTeacher("0eUDFB4h8WdpQwWmxPzcngGDR7a2")
            .then(response => {
                console.log('teacherProvider.getTeacher() Test with subscribe:')
                console.log(response)
            })

        console.log('teacherProvider.getAllTeachers() Test raw:')
        console.log(this.teacherProvider.getAllTeachers())
        this.teacherProvider.getAllTeachers()
            .then(response => {
                console.log('teacherProvider.getAllTeachers() Test with subscribe:')
                console.log(response)
            })

        console.log('teacherProvider.getTeachersOfSchool() Test raw:')
        console.log(this.teacherProvider.getTeachersOfSchool("-KcBQ6jMFDopvvJ0muK9"))
        this.teacherProvider.getTeachersOfSchool("-KcBQ6jMFDopvvJ0muK9")
            .then(response => {
                console.log('teacherProvider.getTeachersOfSchool() Test with subscribe:')
                console.log(response)
            })

    }

    private runWeeklyActivityProviderTests() {
        console.log('weeklyActivityProvider.getActivityImage() Test raw:')
        console.log(this.weeklyActivityProvider.getActivityImage("-Ketn4qOsNQOA0vSjZRC", "1234"))
        this.weeklyActivityProvider.getActivityImage("-Ketn4qOsNQOA0vSjZRC", "1234")
            .then(response => {
                console.log('weeklyActivityProvider.getActivityImage() Test with subscribe:')
                console.log(response)
            })
    }

    private runActivityProviderTests() {
        console.log('activityProvider.getActivities() Test raw:')
        console.log(this.activityProvider.getActivities("-Ketn4qOsNQOA0vSjZRC"))
        this.activityProvider.getActivities("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('activityProvider.getActivities() Test with subscribe:')
                console.log(response)
            })
    }

    private runInvitationProviderTests() {
        console.log('invitationProvider.getInvitations() Test raw:')
        console.log(this.invitationProvider.getInvitations("-Ketn4qOsNQOA0vSjZRC"))
        this.invitationProvider.getInvitations("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('invitationProvider.getInvitations() Test with subscribe:')
                console.log(response)
            })

        console.log('invitationProvider.getInvitationsOfHost() Test raw:')
        console.log(this.invitationProvider.getInvitationsOfHost("-Ketn4qOsNQOA0vSjZRC", "wXQd9quU4sT2zYg6bqvgr1mrvW42"))
        this.invitationProvider.getInvitationsOfHost("-Ketn4qOsNQOA0vSjZRC", "wXQd9quU4sT2zYg6bqvgr1mrvW42")
            .then(response => {
                console.log('invitationProvider.getInvitationsOfHost() Test with subscribe:')
                console.log(response)
            })
    }


}
