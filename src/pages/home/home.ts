import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CalenderPage } from '../calender/calender';

import { MenuController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController,
                public menuCtrl: MenuController,
                public authData: AuthData) {

    }

    openCalender(page) {

        this.navCtrl.push(CalenderPage);
    }

    logout() {
        console.log('logout clicked');
        this.authData.logoutUser();
        /*
                .then( authData => {
                    console.log('logout success!');
                    this.navCtrl.setRoot(LoginPage);
                }, error => {
                    console.log('logout error!');
                });
                */
    }

    /*
    openMenu() {
        this.menuCtrl.open();
    }
    */

}
