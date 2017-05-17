import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";
import {Message} from "../../../providers/message";
import {AuthData} from "../../../providers/auth-data";
import {Classes} from "../../../providers/classes";
import {Parents} from "../../../providers/parents";
import {FirebaseListObservable} from "angularfire2";
import {Teachers} from "../../../providers/teachers";
import {HumanReadableDateTime} from "../../../helpers/humanReadableDateTime";

@Component({
    selector: 'page-dialog',
    templateUrl: 'dialog.html',
    providers: [Translator, Message, Parents, Teachers, HumanReadableDateTime]
})

// this page works only for a teacher interacting with a parent.
// to make it work for the others, we should keep all user names, surnames and profile picture urls together under /user.
export class DialogPage {
    private translate: TranslateService;
    private messagesOfConversation: FirebaseListObservable<any[]>;
    private newMessageText: string;

    private userId: string;
    private userName: string;
    private userImage: string;

    private dialogPartnerId: string;
    private dialogPartnerName: string;
    private dialogPartnerImage: string;

    constructor(public navCtrl: NavController, public translator: Translator, private messageProvider: Message,
                private authData: AuthData, private classProvider: Classes, private parentProvider: Parents,
                private navParams: NavParams, private teacherProvider: Teachers,
                private humanReadableDateTime: HumanReadableDateTime) {
        this.translate = translator.translatePipe;
        this.userId = this.authData.getUserId();
        this.dialogPartnerId = navParams.get('dialogPartnerId');
        this.messagesOfConversation = this.messageProvider.getConversation(this.dialogPartnerId);

        this.loadUser();
    }

    private loadUser() {
        this.teacherProvider.getTeacher(this.userId).subscribe( teacherSnapshot => {
            this.userName = teacherSnapshot.name + " " + teacherSnapshot.surname;
            this.userImage = teacherSnapshot.profileImageUrl;
        });

        this.parentProvider.getParent(this.dialogPartnerId).subscribe( parentSnapshot => {
            this.dialogPartnerImage = parentSnapshot.profileImageUrl;
            this.dialogPartnerName = parentSnapshot.parentName + " " + parentSnapshot.parentSurname;
        })
    }

    ionViewDidLoad() {
        console.log('Hello MessagePage Page');
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
    }

}
