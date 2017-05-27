import {Component, Input, OnInit} from '@angular/core';
import {Translator} from "../../app/translator";
import {Message} from "../../providers/message";
import {Parents} from "../../providers/parents";
import {TranslateService} from "ng2-translate";
import {NavController} from "ionic-angular";
import {MessageModel} from "../../models/message-model";

@Component({
   selector: 'inbox-dialogs-list',
   templateUrl: 'inbox-dialogs-list.html',
   providers: [Translator, Message, Parents]
})

export class InboxDialogsListDirective implements OnInit {
   private translate: TranslateService;
   private conversations: Promise<MessageModel[]>;
   private parents: {};

   constructor(
      public translator: Translator,
      public navCtrl: NavController,
      private messageProvider: Message,
      private parentProvider: Parents,
   ) {
      this.translate = this.translator.translatePipe;
      this.conversations = this.messageProvider.getAllConversations();
      this.conversations.then(convs => {
         convs.forEach(conv => {
            this.loadParent(conv.id)
         })
      })
      this.parents = {};
   }

   ngOnInit(): void {

   }

   private openDialog(dialogPartnerId){
      // this.navCtrl.push(TeacherDialogPage, {dialogPartnerId: dialogPartnerId});
      // this.messageProvider.setDialogRead(dialogPartnerId);
   }

   private loadParent(parentId: string){
      console.log('loadParent called with: ')
      console.log(parentId)

      this.parentProvider.getParent(parentId).then(subs => {
         console.log('subs is:')
         console.log(subs)
         this.parents[parentId] = {}
         this.parents[parentId].parentName = subs.parentName
         this.parents[parentId].parentSurname = subs.parentSurname
         this.parents[parentId].profileImageUrl = subs.profileImageUrl
      })
   }

}
