import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Message} from "../../providers/message";
import {Parents} from "../../providers/parents";
import {TranslateService} from "@ngx-translate/core";
import {NavController} from "ionic-angular";
import {ConversationModel} from "../../models/conversation-model";
import {Teachers} from "../../providers/teachers";
import {ParentDialogPage} from "../../pages/parent/dialog/dialog";

@Component({
   selector: 'inbox-dialogs-list',
   templateUrl: 'inbox-dialogs-list.html',
   providers: [Translator, Message, Parents]
})

export class InboxDialogsListDirective implements OnInit {
   private translate: TranslateService;
   private conversations: Promise<ConversationModel[]>;
   private persons: {};
   @Input() role: string;

   constructor(
      public translator: Translator,
      public navCtrl: NavController,
      private messageProvider: Message,
      private parentProvider: Parents,
      private teacherProvider: Teachers,
   ) {
      this.translate = this.translator.translatePipe;
      this.conversations = this.messageProvider.getAllConversations();
      this.conversations.then(convs => {
         convs.forEach(conv => {
            if(this.role=='teacher')//teachers can message to only parents
               this.loadParent(conv.id)
            else//parents can message to only teachers
               this.loadTeacher(conv.id)
         })
      })
      this.persons = {};
   }

   ngOnInit(): void {

   }

   private openDialog(dialogPartnerId){
      this.navCtrl.push(ParentDialogPage, {dialogPartnerId: dialogPartnerId});
   }

   private loadParent(parentId: string){
      console.log('loadParent called with: ')
      console.log(parentId)

      this.parentProvider.getParent(parentId).then(subs => {
         console.log('subs is:')
         console.log(subs)
         this.persons[parentId] = {}
         this.persons[parentId].parentName = subs.parentName
         this.persons[parentId].parentSurname = subs.parentSurname
         this.persons[parentId].profileImageUrl = subs.profileImageUrl
      })
   }

   private loadTeacher(id: string) {
      this.teacherProvider.getTeacher(id).then(teacher => {
         this.persons[id] = {}
         this.persons[id].name = teacher.name
         this.persons[id].surname = teacher.surname
         this.persons[id].profileImageUrl = teacher.profileImageUrl

      })
   }
}
