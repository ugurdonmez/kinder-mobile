import {Component} from '@angular/core';
import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";

@Component({
   selector: 'page-school-admin-branch',
   templateUrl: 'branch.html',
   providers: [Translator]
})

export class SchoolAdminBranchPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public translator: Translator) {

   }

   ionViewDidLoad() {

   }

}
