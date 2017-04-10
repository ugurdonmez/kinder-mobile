import { Injectable } from '@angular/core';


@Injectable()
export class HumanReadableDateTime{
    // instead of this, we can use momentjs. but its Turkish translation is very bad.
    // takes timestamp (miliseconds since 1.1.1970)
    // returns human readable date and time
    // TODO Multilanguage this.
    public get(timestamp): string{
        let now = +new Date();// + converts date to int

        var delta = Math.round((+new Date - timestamp) / 1000);

        if (delta<0){
            return new Date(parseInt(timestamp)).toLocaleDateString("tr-tr")
        }

        var minute = 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;

        let options = {
            hour: "2-digit",
            minute: "2-digit"
        };

        if (delta < 30) {
            return 'just now';
        }
        else if (delta < minute) {
            return delta + ' seconds ago';
        }
        else if (delta < 2 * minute) {
            return 'a minute ago.'
        }
        else if (delta < hour) {
            return Math.floor(delta / minute) + ' minutes ago.';
        }
        else if (Math.floor(delta / hour) == 1) {
            return '1 hour ago.'
        }
        else if (delta < day) {
            return Math.floor(delta / hour) + ' hours ago.';
        }
        else if (delta < week-day){
            options['weekday']= "short";
        }
        else{
            options['month']= "short";
            options['day']= "numeric";
        }

        if (delta >= 360 * day){
            options['year']="numeric";
        }

        return new Date(parseInt(timestamp)).toLocaleDateString("tr-tr", options)
    }
}

