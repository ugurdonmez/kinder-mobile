import {Component, Input} from '@angular/core';
import {AuthData} from "../../providers/auth-data";
import {Message} from "../../providers/message";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {HumanReadableDateTime} from "../../helpers/humanReadableDateTime";
import {Teachers} from "../../providers/teachers";

@Component({
    selector: '[message-dialog]',
    templateUrl: 'message-dialog.html',
    providers: [HumanReadableDateTime, Teachers, Message]
})
// TODO
// WARNING
// THIS CLASS WILL BE DELETED because it includes ion-footer, and it is impossible to include ion-footer into other views properly.
// so, we will delete this. message-parent and message/dialog pages replaced this.
export class MessageDialogComponent {
    @Input() partnerUserId: string;
    private userId: string;
    private newMessageText: string;
    private messagesOfConversation: FirebaseListObservable<any[]>;
    private userRole: string;
    private userImages: {};

    constructor(private authData: AuthData,
                private messageProvider: Message,
                private humanReadableDateTime: HumanReadableDateTime,
                private teacherProvider: Teachers) {
        this.userId = this.authData.getUserId();
        this.authData.getUserRole().subscribe(snapshot => {
            this.userRole = snapshot.$value
        });
        this.userImages = {};
    }

    ngOnInit(): void {
        // console.log(this.isClassConversation);
        // this.loadUserImages();
    }

    private sendMessage(): void {
        this.messageProvider.sendMessage(this.partnerUserId, this.newMessageText);
        this.newMessageText = "";
    }



    private getViewName(userId): string {
        if (this.userRole == "parent") {
            // console.log("this user is a parent.")
            if (userId == this.userId) {
                return "Me" // TODO multilanguage
            }
            else {
                return "Teacher"
            }
        }
        // console.log(this.userRole)
        return ""
    }

    // private loadUserImages() {
    //     // this.getUserImage(this.userId);
    //     // this.getUserImage(this.partnerUserId);
    //     if (this.userRole == "parent") {
    //         // console.log("this user is a parent.")
    //         this.teacherProvider.getTeacher(this.partnerUserId).subscribe(snapshot => {
    //             // console.log(snapshot.profileImageUrl);
    //             this.userImages[this.partnerUserId] = snapshot.profileImageUrl;
    //         })
    //
    //     }
    // }

    // private getImageLink(userId) {
    //     console.log("get image link called with:");
    //     console.log(userId);
    //     console.log("returning:");
    //     console.log(this.userImages[userId]);
    //
    //     // return this.userImages[userId];
    //     this.teacherProvider.getImage(userId).subscribe( snapshot => {
    //         console.log("getImage snapshot:")
    //         console.log(snapshot)
    //     })
    //     if (userId == '')
    //     return this.teacherProvider.getImage(userId);
    // }
}
