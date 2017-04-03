
import { Directive } from '@angular/core';

@Directive({
   selector: '[header-directive]'
})

export class HeaderDirective {

  constructor() {
    console.log('Hello HeaderDirective Directive');
  }
}
