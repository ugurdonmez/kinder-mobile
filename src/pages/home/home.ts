import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CalenderPage } from '../calender/calender';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    constructor(public navCtrl: NavController) {
    
    }
    
    openCalender(page) {
        
        this.navCtrl.push(CalenderPage);
    }

}
