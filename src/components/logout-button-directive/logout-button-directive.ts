import {Component} from '@angular/core';
import {LoginPage} from "../../pages/login/login";
import {AuthData} from "../../providers/auth-data";
import {NavController} from "ionic-angular";

@Component({
    selector: '[logout-button-directive]',
    templateUrl: 'logout-button-directive.html'
})

export class LogoutButtonDirective {
    constructor(
        // private elementRef: ElementRef,
        // private renderer: Renderer,
        private authData: AuthData,
        private navCtrl: NavController
    ) {
        console.log('Hello LogoutButtonDirective Directive');
        // this.renderer.setElementProperty(this.elementRef.nativeElement, 'end', '');
        // this.renderer.setElementClass(this.elementRef.nativeElement, 'end', true);
        // let ionbuttons = this._renderer.createElement(this._elRef.nativeElement, 'ion-buttons');
        // this._renderer.setElementClass(this._elRef.nativeElement, 'end', true);
        // this._renderer.createText(ionbuttons, "hello, world!");
        // let ionbutton = this._renderer.createElement(ionbuttons, 'button ion-button end')
        // this._renderer.invokeElementMethod(ionbutton, 'click', ['logout'])
    }

    private logout(){
        console.log('logout clicked');
        this.authData.logoutUser();
        this.navCtrl.setRoot(LoginPage);
    }

    // @Input() set myUnless(condition: boolean) {
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //     this.hasView = true;
    // }
}
