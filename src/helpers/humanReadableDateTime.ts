import moment from 'moment';

import { Injectable } from '@angular/core';
//

@Injectable()
export class HumanReadableDateTime {
    constructor(){

    }
    public getDifference(timestamp): string{
        return moment(timestamp).fromNow()
    }
}
