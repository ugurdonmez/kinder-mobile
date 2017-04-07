import {Component, Input} from '@angular/core';

@Component({
    selector: '[home-header]',
    templateUrl: 'home-header.html'
})

export class HomeHeaderDirective {
    @Input() titleTextEn: string;

    constructor(
    ) {
        console.log('Hello HomeHeader');
    }
}
