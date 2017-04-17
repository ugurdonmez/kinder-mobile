import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Translator} from "../../../app/translator";
import {TranslateService} from "ng2-translate";
import {Message} from "../../../providers/message";
import {AuthData} from "../../../providers/auth-data";
import {Classes} from "../../../providers/classes";
import {Parents} from "../../../providers/parents";

@Component({
    selector: 'page-dialog',
    templateUrl: 'dialog.html',
    providers: [Translator, Message, Parents]
})

export class DialogPage {
    private translate: TranslateService;
    private dialogPartnerId: string;

    constructor(public navCtrl: NavController, public translator: Translator, private messageProvider: Message,
                private authData: AuthData, private classProvider: Classes, private parentProvider: Parents,
                private navParams: NavParams) {
        this.translate = translator.translatePipe;
        this.dialogPartnerId = navParams.get('dialogPartnerId');
    }

    ionViewDidLoad() {
        console.log('Hello MessagePage Page');
    }

    // private getParent(parentId: string){
    //     let reply = this.parentProvider.getParent(parentId);
    //     // reply.subscribe( snapshot => {
    //     //     console.log(snapshot)
    //     // })
    //     return reply;
    // }
}
