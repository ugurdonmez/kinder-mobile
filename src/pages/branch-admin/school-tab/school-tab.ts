import {Component} from '@angular/core';
import {Translator} from "../../../app/translator";

@Component({
   selector: 'page-branch-admin-school-tab',
   templateUrl: 'school-tab.html',
   providers: [Translator]
})

export class BranchAdminSchoolPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public translator: Translator) {

   }

}
