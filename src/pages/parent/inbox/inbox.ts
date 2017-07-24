
import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'page-teacher-inbox',
   templateUrl: 'inbox.html',
})

export class ParentInboxPage implements OnInit {

   constructor() {
   }

   ngOnInit(): void {
      console.log("ParentInboxPage: ngOnInit")
   }
}
