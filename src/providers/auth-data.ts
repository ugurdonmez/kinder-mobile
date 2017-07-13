import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { FirebaseApp } from 'angularfire2';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import {UserModel} from "../models/user-model";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthData {

    public user: any;

    constructor(public af: FirebaseApp,
                private afd: AngularFireDatabase,
                private afAuth: AngularFireAuth
    ) {
        afAuth.authState.subscribe( user => {
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
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    }

    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): any {
        return this.afAuth.auth.signOut();
    }

    signupUser(newEmail: string, newPassword: string): any {
        this.afd.list('/all-registered-emails/').push({email: newEmail}); // adds mail to registered/invited mails
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
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
        this.afd.list('/all-registered-emails/', {
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
                this.afd.list('/invited-users/').push(invitationJson);
                this.afd.list('/all-registered-emails/').push({email: invitationJson.email});
            }
        })
    }

    public updateUserRoleFromInvitedUsers(): void {
        var userMail = this.getUserEmail();
        this.afd.list('/invited-users', {
            query: {
                orderByChild: 'email',
                equalTo: userMail
            }
        }).subscribe(snapshots => {
            snapshots.forEach(userInvitation => {
                this.afd.object('/users/' + this.getUserId() + '/role').set(userInvitation.role);
                if (userInvitation.role == 'school-admin'){
                    this.afd.object('/users/' + this.getUserId() + '/branchId').set(userInvitation.branchId);
                    this.afd.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                }
                else if (userInvitation.role == 'teacher'){
                    this.afd.object('/users/' + this.getUserId() + '/schoolId').set(userInvitation.schoolId);
                    this.afd.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                    this.afd.object('/users/' + this.getUserId() + '/schoolAdminId').set(userInvitation.schoolAdminId);
                }
                else if (userInvitation.role == 'parent'){
                    this.afd.object('/users/' + this.getUserId() + '/classId').set(userInvitation.classId);
                    this.afd.object('/users/' + this.getUserId() + '/branchAdminId').set(userInvitation.branchAdminId);
                    this.afd.object('/users/' + this.getUserId() + '/schoolAdminId').set(userInvitation.schoolAdminId);
                }
                this.afd.object('/invited-users/' + userInvitation.$key).remove(); // remove invitation
            })
        });
    }

    public getUser(userId?:string): Promise<UserModel>{
       if (!userId){
          var userId:string = this.getUserId();
       }
        return this.afd.object('/users/'+userId)
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
