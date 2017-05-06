import {Component} from '@angular/core';
import {Translator} from "../../../app/translator";

@Component({
   selector: 'page-branch-admin-school',
   templateUrl: 'school.html',
   providers: [Translator]
})

export class BranchAdminSchoolPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public translator: Translator) {

   }

}
