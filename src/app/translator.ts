import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";


@Injectable()
export class Translator {

    constructor(public translatePipe: TranslateService){
        translatePipe.setDefaultLang('en');

        // console.log(window.navigator.language);
        if (window.navigator.language.includes("tr")){
            translatePipe.use('tr');
        }
    }
}