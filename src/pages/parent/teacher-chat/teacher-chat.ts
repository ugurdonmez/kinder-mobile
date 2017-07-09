import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Translator} from "../../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {AuthData} from "../../../providers/auth-data";
import {Classes} from "../../../providers/classes";
import {Message} from "../../../providers/message";
import {Parents} from "../../../providers/parents";
import {Teachers} from "../../../providers/teachers";
import {HumanReadableDateTime} from "../../../helpers/humanReadableDateTime";
import {MessageModel} from "../../../models/message-model";

@Component({
    selector: 'page-parent-teacher-chat',
    templateUrl: 'teacher-chat.html',
    providers: [Translator, Message, HumanReadableDateTime, Parents, Teachers]
})

export class ParentChatPage {
    private translate: TranslateService;
    private classId: string;
    private newMessageText: string;
    private newClassPost: string;

    private userId: string;
    private userName: string;
    private userImage: string;

    private teacherId: string;
    private teacherName: string;
    private teacherImage: string;
    private userDetails: {};
    private isTeacherConversationUnread: string;
    private messagesOfConversation: Promise<MessageModel[]>;
    private classWallPosts: Promise<MessageModel[]>;


    constructor(public navCtrl: NavController, public translator: Translator,
                private authData: AuthData, private classProvider: Classes, private messageProvider: Message,
                private humanReadableDateTime: HumanReadableDateTime, private parentsProvider: Parents,
                private teachersProvider: Teachers) {
        this.translate = translator.translatePipe;
        this.userDetails = {};
        this.loadThisUser();
    }

    private markTeacherConversationRead(){
        this.messageProvider.setDialogRead(this.teacherId);
    }

    private loadThisUser() {
        this.authData.getUser().then(snapshot => {
            this.classId = snapshot.classId; // loads class id
            this.userId = snapshot.id;
            this.loadClass();
            this.parentsProvider.getParent(this.userId).then( parentSnapshot => {
                this.userImage = parentSnapshot.profileImageUrl;
                this.userName = parentSnapshot.parentName + " " + parentSnapshot.parentSurname;
            })
        })
    }

    private loadClass() {
        this.classProvider.getClass(this.classId).then(classSnapshot => {
            this.teacherId = classSnapshot.teacher_id;
            this.messageProvider.getConversation(this.teacherId).then( conversationSnapshot => {
                this.isTeacherConversationUnread = conversationSnapshot.isUnread;
            });
            this.loadTeacher();
            this.loadTeacherConversation();
            console.log("class id, teacher id:");
            console.log(this.classId);
            console.log(this.teacherId);
        });
        this.loadClassWall()
    }

    private loadTeacherConversation() {
        this.messagesOfConversation = this.messageProvider.getMessagesOfConversation(this.teacherId);
    }

    private loadClassWall() {
        this.classWallPosts = this.messageProvider.getMessagesOfClassWall(this.classId)
        this.loadAllUsersPostedOnWall()
    }

    ionViewDidLoad() {
        console.log('Hello MessageParentPage Page');
    }

    private getDateTimeHumanReadable(messageTimestamp): string {
        return this.humanReadableDateTime.getDifference(messageTimestamp);
    }

    private sendMessage(): void {
        this.messageProvider.sendMessage(this.teacherId, this.newMessageText);
        this.newMessageText = "";
        this.loadTeacherConversation()
    }

    private postToClassWall(): void {
        this.messageProvider.postToClassWall(this.classId, this.newClassPost);
        this.newClassPost = "";
        this.loadClassWall()
    }

    private getImageLink(userId) {
        if(userId == this.userId){
            return this.userImage
        }
        else if(userId==this.teacherId){
            return this.teacherImage
        }
        else{
            return "an error occured."
        }
    }

    private getName(userId) {
        if(userId == this.userId){
            return this.userName
        }
        else if(userId==this.teacherId){
            return this.teacherName
        }
        else{
            return "an error occured."
        }
    }

    private loadTeacher() {
        this.teachersProvider.getTeacher(this.teacherId).then( teacherSnapshot => {
            this.teacherName = teacherSnapshot.name + " " + teacherSnapshot.surname;
            this.teacherImage = teacherSnapshot.profileImageUrl;
        })
    }

    private loadAllUsersPostedOnWall():void {
        this.classWallPosts.then( posts => {
            posts.forEach( post => {
                let senderUserId:string = post.sender;
                if (senderUserId in this.userDetails){
                    return;
                }
                else{
                    this.loadUser(senderUserId);
                }
            })
        })
    }

    private loadUser(userId: string) {
        this.authData.getUser(userId).then( userSnapshot => {
            if (userSnapshot.role == 'teacher'){
                this.teachersProvider.getTeacher(userId).then( teacherSnapshot => {
                    this.userDetails[userId] = {};
                    this.userDetails[userId]['name'] = teacherSnapshot.name + " " + teacherSnapshot.surname;
                    this.userDetails[userId]['imageUrl'] = teacherSnapshot.profileImageUrl;
                })
            }
            else if(userSnapshot.role == 'parent'){
                this.parentsProvider.getParent(userId).then( parentSnapshot => {
                    this.userDetails[userId] = {};
                    this.userDetails[userId]['name'] = parentSnapshot.parentName + " " + parentSnapshot.parentSurname;
                    this.userDetails[userId]['imageUrl'] = parentSnapshot.profileImageUrl;
                })
            }
            else{
                this.userDetails[userId] = {};
                this.userDetails[userId]['name'] = 'Admin';
                this.userDetails[userId]['imageUrl'] = '';
            }
        })
    }

    public getUserDetails(userId: string){
        if(!(userId in this.userDetails)){
            this.loadUser(userId);
        }
        else{
            return this.userDetails[userId];
        }
    }
}
