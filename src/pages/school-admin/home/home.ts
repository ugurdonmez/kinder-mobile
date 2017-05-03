
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
import {Reminder} from "../../../providers/reminder";
import {WeeklyMealMenu} from "../../../providers/weeklymealmenu";
import {Homework} from "../../../providers/homework";
import {Gallery} from "../../../providers/gallery";

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
   private invitationProvider: Invitation, private reminderProvider: Reminder, private weeklyMealMenuProvider: WeeklyMealMenu,
   private homeworkProvider: Homework, private galleryProvider: Gallery) {
       // this.runSchoolProviderTests();
       // this.runClassProviderTests();
       // this.runParentProviderTests();
       // this.runTeacherProviderTests();
       // this.runWeeklyActivityProviderTests();
       // this.runActivityProviderTests();
       // this.runInvitationProviderTests();
       // this.runReminderProviderTests();
       // this.runWeeklyMealMenuProviderTests();
       // this.runHomeworkProviderTests();
       this.runGalleryProviderTests();
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

    private runReminderProviderTests() {
        console.log('reminderProvider.getReminders() Test raw:')
        console.log(this.reminderProvider.getReminders("wXQd9quU4sT2zYg6bqvgr1mrvW42"))
        this.reminderProvider.getReminders("wXQd9quU4sT2zYg6bqvgr1mrvW42")
            .then(response => {
                console.log('reminderProvider.getReminders() Test with subscribe:')
                console.log(response)
            })
    }

    private runWeeklyMealMenuProviderTests() {
        console.log('weeklyMealMenuProvider.getMenuImage() Test raw:')
        console.log(this.weeklyMealMenuProvider.getMenuImage("-Ketn4qOsNQOA0vSjZRC", "datehere"))
        this.weeklyMealMenuProvider.getMenuImage("-Ketn4qOsNQOA0vSjZRC", "datehere")
            .then(response => {
                console.log('weeklyMealMenuProvider.getMenuImage() Test with subscribe:')
                console.log(response)
            })
    }

    private runHomeworkProviderTests() {
        console.log('homeworkProvider.getHomeworks() Test raw:')
        console.log(this.homeworkProvider.getHomeworks("-Ketn4qOsNQOA0vSjZRC"))
        this.homeworkProvider.getHomeworks("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('homeworkProvider.getHomeworks() Test with subscribe:')
                console.log(response)
            })
    }

    private runGalleryProviderTests() {
        console.log('galleryProvider.getAllAlbums() Test raw:')
        console.log(this.galleryProvider.getAllAlbums("-Ketn4qOsNQOA0vSjZRC"))
        this.galleryProvider.getAllAlbums("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('galleryProvider.getAllAlbums() Test with subscribe:')
                console.log(response)
            })

        console.log('galleryProvider.getImagesInAlbum() Test raw:')
        console.log(this.galleryProvider.getImagesInAlbum("-Ketn4qOsNQOA0vSjZRC", "-KgebT_yvgW6BqZE5dLx"))
        this.galleryProvider.getImagesInAlbum("-Ketn4qOsNQOA0vSjZRC", "-KgebT_yvgW6BqZE5dLx")
            .then(response => {
                console.log('galleryProvider.getImagesInAlbum() Test with subscribe:')
                console.log(response)
            })

        console.log('galleryProvider.getImage() Test raw:')
        console.log(this.galleryProvider.getImage("-Ketn4qOsNQOA0vSjZRC", "-KgebxJc3o8QRNoBuP1-"))
        this.galleryProvider.getImage("-Ketn4qOsNQOA0vSjZRC", "-KgebxJc3o8QRNoBuP1-")
            .then(response => {
                console.log('galleryProvider.getImage() Test with subscribe:')
                console.log(response)
            })

        console.log('galleryProvider.getImagesOfClass() Test raw:')
        console.log(this.galleryProvider.getImagesOfClass("-Ketn4qOsNQOA0vSjZRC"))
        this.galleryProvider.getImagesOfClass("-Ketn4qOsNQOA0vSjZRC")
            .then(response => {
                console.log('galleryProvider.getImagesOfClass() Test with subscribe:')
                console.log(response)
            })

        console.log('galleryProvider.getImageIdsOfStudent() Test raw:')
        console.log(this.galleryProvider.getImageIdsOfStudent("-Ketn4qOsNQOA0vSjZRC", 'StudentId'))
        this.galleryProvider.getImageIdsOfStudent("-Ketn4qOsNQOA0vSjZRC", 'StudentId')
            .then(response => {
                console.log('galleryProvider.getImageIdsOfStudent() Test with subscribe:')
                console.log(response)
            })


    }


}
