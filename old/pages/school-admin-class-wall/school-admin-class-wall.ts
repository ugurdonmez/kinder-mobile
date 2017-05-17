import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Classes} from "../../providers/classes";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Teachers} from "../../providers/teachers";
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {AuthData} from "../../providers/auth-data";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Parents} from "../../providers/parents";
import {Attendance} from "../../providers/attendance";
import {Message} from "../../providers/message";
import {HumanReadableDateTime} from "../../helpers/humanReadableDateTime";

@Component({
  selector: 'page-school-admin-wall',
  templateUrl: 'school-admin-class-wall.html',
    providers: [Classes, Teachers, Translator, Message, HumanReadableDateTime, Parents, AuthData]
})


export class SchoolAdminWallPage {
    private classId: string;
    private _class: FirebaseObjectObservable<any>;
    private translate: TranslateService;
    private userDetails: {};

    private classWallPosts: FirebaseListObservable<any[]>;
    private newClassPost: string;

    constructor(public navCtrl: NavController, public classesProvider: Classes,
                private navParams: NavParams, private teachersProvider: Teachers, public translator: Translator,
                private authData: AuthData, private messageProvider: Message,
                private humanReadableDateTime: HumanReadableDateTime, private parentsProvider: Parents) {
        this.translate = translator.translatePipe;
        this.classId = navParams.get('classId');
        this.userDetails = {};

        // get class
        this._class = classesProvider.getClass(this.classId);

        this.classWallPosts = this.messageProvider.getClassWall(this.classId);
        this.loadAllUsersPostedOnWall();
    }

    private getDateTimeHumanReadable(messageTimestamp): string {
        return this.humanReadableDateTime.getDifference(messageTimestamp);
    }

    private postToClassWall(): void {
        this.messageProvider.postToClassWall(this.classId, this.newClassPost);
        this.newClassPost = "";
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

    private deleteWallPost(postId){
        this.messageProvider.deletePostFromClassWall(this.classId, postId);
    }
}
