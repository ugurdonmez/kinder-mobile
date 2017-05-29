import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Classes} from "../../providers/classes";
import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Teachers} from "../../providers/teachers";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {Message} from "../../providers/message";
import {HumanReadableDateTime} from "../../helpers/humanReadableDateTime";
import {ClassModel} from "../../models/class-model";
import {MessageModel} from "../../models/message-model";

@Component({
  selector: 'class-wall-admin',
  templateUrl: 'class-wall-admin.html',
    providers: [Classes, Teachers, Translator, Message, HumanReadableDateTime, Parents, AuthData]
})


export class ClassWallAdminDirective implements OnInit{
    @Input() classId: string;
    private translate: TranslateService;
    private userDetails: {};

    private newClassPost: string;
    private _class: Promise<ClassModel>;
    private classWallPosts: Promise<MessageModel[]>;

    constructor(public navCtrl: NavController, public classesProvider: Classes,
                private teachersProvider: Teachers, public translator: Translator,
                private authData: AuthData, private messageProvider: Message,
                private humanReadableDateTime: HumanReadableDateTime, private parentsProvider: Parents) {
    }

    ngOnInit(): void {
        this.translate = this.translator.translatePipe;
        this.userDetails = {};

        // get class
        this._class = this.classesProvider.getClass(this.classId);

        this.loadWall()
    }

    private getDateTimeHumanReadable(messageTimestamp): string {
        return this.humanReadableDateTime.getDifference(messageTimestamp);
    }

    private postToClassWall(): void {
        this.messageProvider.postToClassWall(this.classId, this.newClassPost);
        this.newClassPost = "";
        this.loadWall()
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

    private deleteWallPost(postId){
        this.messageProvider.deletePostFromClassWall(this.classId, postId);
        this.loadWall()
    }

    private loadWall() {
        this.classWallPosts = this.messageProvider.getMessagesOfClassWall(this.classId);
        this.loadAllUsersPostedOnWall();
    }
}
