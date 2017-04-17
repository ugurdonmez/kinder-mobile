import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Message} from "../../providers/message";
import {AuthData} from "../../providers/auth-data";
import {Classes} from "../../providers/classes";
import {Parents} from "../../providers/parents";
import {DialogPage} from "./dialog/dialog";


@Component({
    selector: 'page-message',
    templateUrl: 'message.html',
    providers: [Translator, Message, Parents]
})

export class MessagePage {
    private translate: TranslateService;
    private conversations: any;
    // private parentProvider: Parents;

    constructor(public navCtrl: NavController, public translator: Translator, private messageProvider: Message,
                private parentProvider: Parents) {
        this.translate = translator.translatePipe;
        this.conversations = this.messageProvider.getAllConversations();
    }

    ionViewDidLoad() {
        console.log('Hello MessagePage Page');
    }

    private getParent(parentId: string){
        let reply = this.parentProvider.getParent(parentId);
        // reply.subscribe( snapshot => {
        //     console.log(snapshot)
        // })
        return reply;
    }

    private openDialog(dialogPartnerId){
        this.navCtrl.push(DialogPage, {dialogPartnerId: dialogPartnerId});
    }
}
