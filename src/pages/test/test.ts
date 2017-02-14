import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";



@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
  providers: [Translator]
})

export class TestPage {
  username = '';
  email = '';
  private translate: TranslateService;
  constructor(private nav: NavController, private auth: AuthService, public translator: Translator) {
    this.translate = translator.translatePipe;
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.nav.setRoot(LoginPage)
    });
  }
}
