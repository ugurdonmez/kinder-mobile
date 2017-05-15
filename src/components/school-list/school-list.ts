import {Component, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {SchoolModel} from "../../models/school-model";
import {Schools} from "../../providers/schools";
import {NavController} from "ionic-angular";
import {BranchAdminSchoolDetailsPage} from "../../pages/branch-admin/school-details/school-details";
import {BranchAdminCreateSchoolPage} from "../../pages/branch-admin/create-school/create-school";

@Component({
   selector: 'school-list',
   templateUrl: 'school-list.html',
   providers: [Schools, Translator]
})

export class SchoolListDirective implements OnInit {

   private schools: Array<SchoolModel>

   constructor(public schoolProvider: Schools,
               public translator: Translator,
               public navCtrl: NavController) {
   }

   ngOnInit(): void {
      this.schoolProvider.getSchoolByBranchAdminId()
         .then(res => {
            console.log('SchoolListDirective: constructor schools of branch admin ')
            console.log(res)
            this.schools = res
         })
   }

   private schoolClicked(school): void {
      console.log('goes to class list of that school with school:');
      console.log(school);
      this.navCtrl.push(BranchAdminSchoolDetailsPage, {'school': school})
   }

   private createSchoolButtonClicked(): void{
      this.navCtrl.push(BranchAdminCreateSchoolPage)
   }

}
