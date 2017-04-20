import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {Classes} from "../../providers/classes";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Message} from "../../providers/message";
import {HumanReadableDateTime} from "../../helpers/humanReadableDateTime";
import {Parents} from "../../providers/parents";
import {Teachers} from "../../providers/teachers";

@Component({
    selector: 'page-message-parent',
    templateUrl: 'message-parent.html',
    providers: [Translator, Message, HumanReadableDateTime, Parents, Teachers]
})

export class MessageParentPage {
    private translate: TranslateService;
    private classId: string;
    private messagesOfConversation: FirebaseListObservable<any[]>;
    private newMessageText: string;
    private newClassPost: string;

    private userId: string;
    private userName: string;
    private userImage: string;

    private teacherId: string;
    private teacherName: string;
    private teacherImage: string;
    private isTeacherConversationUnread: FirebaseObjectObservable<any>;
    private classWallPosts: FirebaseListObservable<any[]>;
    private userDetails: {};


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
        this.authData.getUser().subscribe(snapshot => {
            this.classId = snapshot.classId; // loads class id
            this.userId = snapshot.$key;
            this.loadClass();
            this.parentsProvider.getParent(this.userId).subscribe( parentSnapshot => {
                this.userImage = parentSnapshot.profileImageUrl;
                this.userName = parentSnapshot.parentName + " " + parentSnapshot.parentSurname;
            })
        })
    }

    private loadClass() {
        this.classProvider.getClass(this.classId).subscribe(classSnapshot => {
            this.teacherId = classSnapshot.teacher_id;
            this.messageProvider.isDialogUnread(this.teacherId).subscribe( unreadStatusSnapshot => {
                this.isTeacherConversationUnread = unreadStatusSnapshot.$value;
            });
            this.loadTeacher();
            this.loadConversation();
            console.log("class id, teacher id:");
            console.log(this.classId);
            console.log(this.teacherId);
        });
        this.classWallPosts = this.messageProvider.getClassWall(this.classId)
        this.loadAllUsersPostedOnWall();
    }

    private loadConversation() {
        this.messagesOfConversation = this.messageProvider.getConversation(this.teacherId);
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
    }

    private postToClassWall(): void {
        this.messageProvider.postToClassWall(this.classId, this.newClassPost);
        this.newClassPost = "";
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
        this.teachersProvider.getTeacher(this.teacherId).subscribe( teacherSnapshot => {
            this.teacherName = teacherSnapshot.name + " " + teacherSnapshot.surname;
            this.teacherImage = teacherSnapshot.profileImageUrl;
        })
    }

    private loadAllUsersPostedOnWall():void {
        this.classWallPosts.subscribe( posts => {
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
        this.authData.getUser(userId).subscribe( userSnapshot => {
            if (userSnapshot.role == 'teacher'){
                this.teachersProvider.getTeacher(userId).subscribe( teacherSnapshot => {
                    this.userDetails[userId] = {};
                    this.userDetails[userId]['name'] = teacherSnapshot.name + " " + teacherSnapshot.surname;
                    this.userDetails[userId]['imageUrl'] = teacherSnapshot.profileImageUrl;
                })
            }
            else if(userSnapshot.role == 'parent'){
                this.parentsProvider.getParent(userId).subscribe( parentSnapshot => {
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
