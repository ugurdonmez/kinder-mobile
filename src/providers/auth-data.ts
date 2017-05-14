import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import {UserModel} from "../models/user-model";


@Injectable()
export class AuthData {

    public user: any;

    constructor(public af: AngularFire) {
        af.auth.subscribe( user => {
            if (user) {
                this.user = user;
                console.log("AuthData => User:");
                console.log(user);
            }
        });
    }

    getAuthDataUser(): any {
       return this.user;
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
        this.af.database.list('/all-registered-emails/').push({email: newEmail}); // adds mail to registered/invited mails
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
    }

    public getUserId(): string {
        return this.user.uid;
    }

    public getUserEmail(): string{
        return this.user.auth.email;
    }

    public newInvitation(invitationJson: UserModel): void {
        let email: string = invitationJson.email;
        // console.log("newInvitation test. email:")
        // console.log(email)
        this.af.database.list('/all-registered-emails/', {
            query: {
                orderByChild: 'email',
                equalTo: email
        }})
           .subscribe( snapshots => {
            if (snapshots.length > 0){ // ignore if mail is already registered or invited
                console.log("mail already invited.") // TODO: show error popup
            }
            else{ // // proceed if mail is not registered or invited yet
                console.log('invitation successful')
                this.af.database.list('/invited-users/').push(invitationJson);
                this.af.database.list('/all-registered-emails/').push({email: invitationJson.email});
            }
        })
    }

    public updateUserRoleFromInvitedUsers(): void {
        var userMail = this.getUserEmail();
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
                    this.af.database.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                }
                else if (userInvitation.role == 'teacher'){
                    this.af.database.object('/users/' + this.getUserId() + '/schoolId').set(userInvitation.schoolId);
                    this.af.database.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                    this.af.database.object('/users/' + this.getUserId() + '/schoolAdminId').set(userInvitation.schoolAdminId);
                }
                else if (userInvitation.role == 'parent'){
                    this.af.database.object('/users/' + this.getUserId() + '/classId').set(userInvitation.classId);
                    this.af.database.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                    this.af.database.object('/users/' + this.getUserId() + '/schoolAdminId').set(userInvitation.schoolAdminId);
                }
                this.af.database.object('/invited-users/' + userInvitation.$key).remove(); // remove invitation
            })
        });
    }

    public getUser(): Promise<UserModel>{
        let userId = this.getUserId();
        return this.af.database.object('/users/'+userId)
            .map(obj => {
                return this.castObjectToModel(obj, this.getUserEmail())
            })
            .first()
            .toPromise()
    }

    // // Conversion: FirebaseListObservable -> Model
    // private castListToModel(objs: any[]): UserModel[] {
    //     let modelArray: Array<UserModel> = [];
    //     for (let obj of objs) {
    //         var model = new UserModel().fromObject(obj);
    //         modelArray.push(model);
    //     }
    //     return modelArray;
    // }

    // Conversion: FirebaseObjectObservable -> Model
    private castObjectToModel(obj: any, email:string): UserModel {
        return new UserModel().fromObject(obj, email);
    }
}
