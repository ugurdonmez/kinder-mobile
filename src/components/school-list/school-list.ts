import {Component, OnInit, Input} from '@angular/core';
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
   @Input() role: string;

   constructor(public schoolProvider: Schools,
               public translator: Translator,
               public navCtrl: NavController,
   ) {
   }

   ngOnInit(): void {
      if (this.role == 'branch-admin') {
         this.schoolProvider.getSchoolByBranchAdminId()
            .then(res => {
               this.schools = res
            })
      }
      else if (this.role == 'school-admin') {
         this.schoolProvider.getSchoolBySchoolAdminId()
            .then(res => {
               this.schools = res
            })
      }
   }

   private schoolClicked(school): void {
      // console.log('goes to class list of that school with school:');
      // console.log(school);

      if (this.role == 'branch-admin') {
         this.navCtrl.push(BranchAdminSchoolDetailsPage, {'school': school})
      } else if (this.role == 'school-admin') {
         // this.navCtrl.push(SchoolAdminSchoolDetailsPage, {'school': school})
      }
   }

   private createSchoolButtonClicked(): void{

      if (this.role == 'branch-admin') {
         this.navCtrl.push(BranchAdminCreateSchoolPage)
      } else if (this.role == 'school-admin') {
         // this.navCtrl.push(SchoolAdminCreateSchoolPage)
      }
   }

}
