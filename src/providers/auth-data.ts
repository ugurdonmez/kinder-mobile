import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';


@Injectable()
export class AuthData {

    fireAuth: any;

    constructor(public af: AngularFire) {
        af.auth.subscribe( user => {
            if (user) {
                this.fireAuth = user.auth;
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
        this.addUserToUsersCollectionIfNotExist(newEmail);
        return response;
    }

    getUserId(): any{
        var userId;
        userId = this.fireAuth.email.split("@")[0];
        console.log ("user id is: " + userId);
        return userId
    }

    newInvitation(email: string, userRole: string) {
        this.af.database.list('/invited-users/' + userRole).push(email);
    }

    addUserToUsersCollectionIfNotExist(userMail: string): any {
        let userId = userMail.split("@")[0];
        let userObject = this.af.database.object('/users/'+ userId);

        userObject.subscribe( snapshot => {
            console.log(snapshot.val);
            if (snapshot.val === null){
                userObject.set({
                    email: userMail,
                    role: "unknown"
                });
            }
        });
    }

    getUserRole(): any {
        let userId = this.getUserId();
        let userRole = this.af.database.object('/users/'+ userId + "/role");
        return userRole
    }
}
