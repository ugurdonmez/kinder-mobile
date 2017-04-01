import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Message} from "../../providers/message";

/*
  Generated class for the Message page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [Translator, Message]
})
export class MessagePage {
  private translate: TranslateService;

  constructor(public navCtrl: NavController, public translator: Translator, private messageProvider: Message) {
    this.translate = translator.translatePipe;}

  ionViewDidLoad() {
    console.log('Hello MessagePage Page');
  }

  private sendMessageTest(){
    this.messageProvider.sendMessage("b66mMRb4hyfDNRGNcSnOLl6AxdT2", "test message")
  }

  private getinboxtest(){
    this.messageProvider.getInbox().subscribe(snapshot => {
      console.log(snapshot)
    })
  }

  private getoutboxtest(){
    this.messageProvider.getOutbox().subscribe(snapshot => {
      console.log(snapshot)
    })
  }

  private deleteFromOutboxTest(){
    this.messageProvider.deleteOutboxMessage("-Kgf-zjABwhKi-cVsnkD")
  }

  private deleteFromInboxTest(){
    this.messageProvider.deleteInboxMessage("messageid")
  }
}
