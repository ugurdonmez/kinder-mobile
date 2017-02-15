import {TranslateService} from "ng2-translate";
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