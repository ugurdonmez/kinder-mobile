import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Translator} from "../../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {Message} from "../../../providers/message";
import {AuthData} from "../../../providers/auth-data";
import {Classes} from "../../../providers/classes";
import {Parents} from "../../../providers/parents";
import {Teachers} from "../../../providers/teachers";
import {HumanReadableDateTime} from "../../../helpers/humanReadableDateTime";
import {ConversationModel} from "../../../models/conversation-model";
import {MessageModel} from "../../../models/message-model";

@Component({
    selector: 'page-dialog',
    templateUrl: 'dialog.html',
    providers: [Translator, Message, Parents, Teachers, HumanReadableDateTime]
})

// this page works only for a teacher interacting with a parent.
// to make it work for the others, we should keep all user names, surnames and profile picture urls together under /user.
export class TeacherDialogPage {
    private translate: TranslateService;
    private newMessageText: string;

    private userId: string;
    private userName: string;
    private userImage: string;

    private dialogPartnerId: string;
    private dialogPartnerName: string;
    private dialogPartnerImage: string;
    private messagesOfConversation: Promise<MessageModel[]>;

    constructor(public navCtrl: NavController, public translator: Translator, private messageProvider: Message,
                private authData: AuthData, private classProvider: Classes, private parentProvider: Parents,
                private navParams: NavParams, private teacherProvider: Teachers,
                private humanReadableDateTime: HumanReadableDateTime) {
        this.translate = translator.translatePipe;
        this.userId = this.authData.getUserId();
        this.dialogPartnerId = navParams.get('dialogPartnerId');
        this.messagesOfConversation = this.messageProvider.getMessagesOfConversation(this.dialogPartnerId);
        console.log('messagesOfConversation')
        console.log(this.messagesOfConversation)
        this.messageProvider.setDialogRead(this.dialogPartnerId);

        this.loadUser();
    }

    private loadUser() {
        this.teacherProvider.getTeacher(this.userId).then( teacherSnapshot => {
            this.userName = teacherSnapshot.name + " " + teacherSnapshot.surname;
            this.userImage = teacherSnapshot.profileImageUrl;
        });

        this.parentProvider.getParent(this.dialogPartnerId).then( parentSnapshot => {
            this.dialogPartnerImage = parentSnapshot.profileImageUrl;
            this.dialogPartnerName = parentSnapshot.parentName + " " + parentSnapshot.parentSurname;
        })
    }

    ionViewDidLoad() {
    }

    private getImageLink(userId) {
        if(userId == this.userId){
            return this.userImage
        }
        else if(userId==this.dialogPartnerId){
            return this.dialogPartnerImage
        }
        else{
            return "an error occured."
        }
    }

    private getName(userId) {
        if(userId == this.userId){
            return this.userName
        }
        else if(userId==this.dialogPartnerId){
            return this.dialogPartnerName
        }
        else{
            return "an error occured."
        }
    }

    private getDateTimeHumanReadable(messageTimestamp): string {
        return this.humanReadableDateTime.getDifference(messageTimestamp);
    }

    private sendMessage(): void {
        this.messageProvider.sendMessage(this.dialogPartnerId, this.newMessageText);
        this.newMessageText = "";
        this.messagesOfConversation = this.messageProvider.getMessagesOfConversation(this.dialogPartnerId);
    }

}
