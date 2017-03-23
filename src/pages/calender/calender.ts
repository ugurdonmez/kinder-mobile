import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Calendar} from "../../providers/calendar";

/*
 Generated class for the Calender page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-calender',
    templateUrl: 'calender.html',
    providers: [Translator, Calendar]
})
export class CalenderPage {
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public translator: Translator, private calendarProvider: Calendar) {
        this.translate = translator.translatePipe;
        // this.runCalendarProviderReminderTests(); // TODO delete these tests after implementing the front end for this page.
        this.runCalendarProviderInvitationTests(); // TODO delete these tests after implementing the front end for this page.
    }

    ionViewDidLoad() {
        console.log('Hello CalenderPage Page');
    }

    private runCalendarProviderReminderTests() {
        console.log(this.calendarProvider.createReminderForThisUser("reminderText", "reminderDatetime"));
        console.log(this.calendarProvider.getThisUserReminders());
        console.log(this.calendarProvider.deleteReminderFromThisUser("-Kfu3ywdxWE0CCyUTXC7"));

    }

    private runCalendarProviderInvitationTests() {
        console.log(this.calendarProvider.createInvitation("-Ketn4qOsNQOA0vSjZRC", "wXQd9quU4sT2zYg6bqvgr1mrvW42",
            "dsfasdf", "asdjfhaskjfdatetime"));

        console.log(this.calendarProvider.getInvitations("-Ketn4qOsNQOA0vSjZRC"));

        console.log(this.calendarProvider.getInvitationsOfHost("-Ketn4qOsNQOA0vSjZRC", "wXQd9quU4sT2zYg6bqvgr1mrvW42"));

        console.log(this.calendarProvider.deleteInvitation("-Ketn4qOsNQOA0vSjZRC", "-KfuHWBvqAO7SxeHjebZ"));


    }
}
