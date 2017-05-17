import {Component} from '@angular/core';
import {LoginPage} from "../../pages/login/login";
import {AuthData} from "../../providers/auth-data";
import {NavController} from "ionic-angular";

@Component({
    selector: '[logout-button-directive]',
    templateUrl: 'logout-button-directive.html'
})

export class LogoutButtonDirective {
    constructor( private authData: AuthData,
                 private navCtrl: NavController) {
        // console.log('Hello LogoutButtonDirective Directive')
    }

    private logout(){
        // console.log('logout clicked');
        this.authData.logoutUser();
        this.navCtrl.setRoot(LoginPage);
    }
}
