import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Camera} from "ionic-native";
import {WeeklyMealMenu} from "../../providers/weeklymealmenu";

/*
 Generated class for the WeeklyMenu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-weekly-menu',
    templateUrl: 'weekly-menu.html',
    providers: [Translator, WeeklyMealMenu]
})
export class WeeklyMenuPage {
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public translator: Translator,
                private alertCtrl: AlertController, private weeklyMealMenuProvider: WeeklyMealMenu) {
        this.translate = translator.translatePipe;
    }

    ionViewDidLoad() {
        console.log('Hello WeeklyMenuPage Page');
    }

    uploadMenuTest(){
        var imageSource;
        let classId = "classIdMock";
        let date = "dateMock";
        let confirm = this.alertCtrl.create({
            title: this.translate.instant('Image source?'),
            message: '',
            buttons: [
                {
                    text: this.translate.instant('CAMERA'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.CAMERA;
                        this.weeklyMealMenuProvider.addMenuImage(imageSource, classId, date);
                    }
                },
                {
                    text: this.translate.instant('SAVEDPHOTOALBUM'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                        this.weeklyMealMenuProvider.addMenuImage(imageSource, classId, date);
                    }
                },
                {
                    text: this.translate.instant('PHOTOLIBRARY'),
                    handler: () => {
                        imageSource = Camera.PictureSourceType.PHOTOLIBRARY;
                        this.weeklyMealMenuProvider.addMenuImage(imageSource, classId, date);
                    }
                }
            ]
        });
        confirm.present();

        this.weeklyMealMenuProvider.getMenuImage(classId, date).subscribe(snapshot => {
            console.log(snapshot);
        })
        this.weeklyMealMenuProvider.deleteMenuImage(classId, "date2Mock")
    }

}
