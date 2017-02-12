import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';

import * as NodeMailer from '@types/nodemailer';

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

        // create reusable transporter object using the default SMTP transport
        let transporter = NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gmail.user@gmail.com',
                pass: 'yourpass'
            }
        });
        //
        // // setup email data with unicode symbols
        // let mailOptions = {
        //     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        //     to: 'kirca.bora@gmail.com, borakrc@gmail.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world ?', // plain text body
        //     html: '<b>Hello world ?</b>' // html body
        // };
        //
        // // send mail with defined transport object
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Message %s sent: %s', info.messageId, info.response);
        // });




    }
}
