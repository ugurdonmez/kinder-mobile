import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';


@Injectable()
export class AuthData {

    private user: any;

    constructor(public af: AngularFire) {
        af.auth.subscribe( user => {
            if (user) {
                this.user = user;
                console.log("User:");
                console.log(user);
            }
        });
    }

    loginUser(newEmail: string, newPassword: string): any {
        return this.af.auth.login({ email: newEmail, password: newPassword });
    }

    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): any {
        return this.af.auth.logout();
    }

    signupUser(newEmail: string, newPassword: string): any {
        let response = this.af.auth.createUser({ email: newEmail, password: newPassword });
        this.printUID();
        // this.checkInvitedUsersAndAddUserToUsersCollection(newEmail);
        return response;
    }

    getUID(): any{
        return this.user.uid;
    }

    printUID(): any{
        this.af.auth.subscribe( user => {
            console.log(user.uid);
        })
    }

    getUserId(emailAddress?: string): any{
        var userId;
        var email;
        if (emailAddress){
            email = emailAddress;
        }
        else{
            email = this.user.auth.email;
        }
        userId = email.split('.').join("").split("@")[0];

        // console.log ("user id is: " + userId);
        return userId
    }

    // newInvitation(email: string, userRole: string, branchId?: string) {
    newInvitation(invitationJson) {
        let invitedUsersList = this.af.database.list('/invited-users/');
        invitedUsersList.push(invitationJson);
    }

    private checkInvitedUsersAndAddUserToUsersCollection(userMail: string): any {

        //check if user exists in invited users
        // let userId = this.getUserId(userMail);
        // let userObject = this.af.database.object('/users/'+ userId);

        this.af.database.object('/users/' + this.getUID()).set({
            email: userMail,
            role: "unknown"
        });

        let invitedUsersWithThatMail = this.af.database.list('/invited-users/', {
            query: {
                orderByChild: 'email',
                equalTo: userMail
            }
        });

        invitedUsersWithThatMail.subscribe(snapshots => {
            snapshots.forEach(invitedObject => {
                this.af.database.object('/users/' + this.getUID()).set(invitedObject);
            })
        });

        //remove from invited-users
        this.af.database.list('/invited-users', {
            query: {
                orderByChild: 'email',
                equalTo: userMail
            }
        }).subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.af.database.object('/invited-users/' + snapshot.$key).remove();
            })
        });
    }

    getUserRole(): any {
        let userId = this.getUserId();
        let userRole = this.af.database.object('/users/'+ userId + "/role");
        return userRole
    }

    getUser(): any{
        let userId = this.getUserId();
        return this.af.database.object('/users/'+userId);
    }
}
