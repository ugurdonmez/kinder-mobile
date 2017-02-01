import { FormControl } from '@angular/forms';

export class IntegerValidator {

    static isValid(control: FormControl){

        var re = /^[0-9]+$/.test(control.value);

        if (re){
            return null;
        }

        return {"notInteger": true};
    }

}
