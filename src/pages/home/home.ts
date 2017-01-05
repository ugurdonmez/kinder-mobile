import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CalenderPage } from '../calender/calender';

import { MenuController } from 'ionic-angular';

import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { SchoolAdminBranchesPage } from '../school-admin-branches/school-admin-branches';


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

        console.log('open calender');
        console.log(page);

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

    open(page) {
        console.log(page);

        this.navCtrl.push(page.component);
    }

    /*
    openMenu() {
        this.menuCtrl.open();
    }
    */

}
