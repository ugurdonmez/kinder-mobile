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
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
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
}
