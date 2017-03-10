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
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
    }

    getUserId(): any{
        return this.user.uid;
    }

    public getUserEmail(){
        return this.user.auth.email;
    }

    // newInvitation(email: string, userRole: string, branchId?: string) {
    public newInvitation(invitationJson) {
        let invitedUsersList = this.af.database.list('/invited-users/');
        invitedUsersList.push(invitationJson);
    }

    public updateUserRoleFromInvitedUsers(): any {
        var userMail = this.getUserEmail();

        this.af.database.object('/users/' + this.getUserId() + '/email').set(userMail);

        this.af.database.list('/invited-users', {
            query: {
                orderByChild: 'email',
                equalTo: userMail
            }
        }).subscribe(snapshots => {
            snapshots.forEach(userInvitation => {
                this.af.database.object('/users/' + this.getUserId() + '/role').set(userInvitation.role);
                if (userInvitation.role == 'school-admin'){
                    this.af.database.object('/users/' + this.getUserId() + '/branchId').set(userInvitation.branchId);
                }
                else if (userInvitation.role == 'teacher'){
                    this.af.database.object('/users/' + this.getUserId() + '/schoolId').set(userInvitation.schoolId);
                }
                this.af.database.object('/invited-users/' + userInvitation.$key).remove(); // remove invitation
            })
        });
    }

    getUserRole(): any {
        return this.af.database.object('/users/'+ this.getUserId() + "/role");
    }

    getUser(): any{
        let userId = this.getUserId();
        return this.af.database.object('/users/'+userId);
    }
}
