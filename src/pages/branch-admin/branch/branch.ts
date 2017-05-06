import {Component} from '@angular/core';
import {Branches} from "../../../providers/branches";
import {Translator} from "../../../app/translator";

@Component({
   selector: 'page-branch-admin-branch',
   templateUrl: 'branch.html',
   providers: [Translator]
})

export class BranchAdminBranchPage {

   private pageTitleTextEn: string = "Branch Admin Home Page";

   constructor(public translator: Translator) {

   }

   ionViewDidLoad() {

   }

}
