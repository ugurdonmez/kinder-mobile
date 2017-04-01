import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {Translator} from "../../app/translator";
import {TranslateService} from "ng2-translate";
import {Camera} from "ionic-native";
import {Gallery} from "../../providers/gallery";

/*
 Generated class for the WeeklyMenu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html',
    providers: [Translator, Gallery]
})
export class GalleryPage {
    private translate: TranslateService;

    constructor(public navCtrl: NavController, public translator: Translator,
                private alertCtrl: AlertController, private galleryProvider: Gallery) {
        this.translate = translator.translatePipe;
    }

    ionViewDidLoad() {
        console.log('Hello Gallery Page');
    }

    // works
    addAlbumTest(){
        this.galleryProvider.addAlbum("-Ketn4qOsNQOA0vSjZRC", "TestAlbum");
    }

    // works
    deleteAlbumTest(){
        console.log(this.galleryProvider.deleteAlbum("-Ketn4qOsNQOA0vSjZRC", "-KgeL1gerATbV5hVbPl7"))
    }

    // works
    getAlbumsTest(){
        this.galleryProvider.getAllAlbums("-Ketn4qOsNQOA0vSjZRC").subscribe(snapshot => {
            console.log(snapshot)
        })
    }

    // works
    addImageTest(){
        this.galleryProvider.addImage("-Ketn4qOsNQOA0vSjZRC", Camera.PictureSourceType.CAMERA);
    }

    // works
    deleteImageTest(){
        this.galleryProvider.deleteImage("-Ketn4qOsNQOA0vSjZRC", "-KgeLi2cZE7iYmEjlvYv");
    }

    // works
    tagStudentTest(){
        this.galleryProvider.tagStudentInImage("-Ketn4qOsNQOA0vSjZRC", "-KgebxJc3o8QRNoBuP1-", "StudentId");
    }

    // works
    untagStudentTest(){
        this.galleryProvider.untagStudentInImage("-Ketn4qOsNQOA0vSjZRC", "-KgebxJc3o8QRNoBuP1-", "StudentId");
    }

    //
    getImagesOfStudentTest(){
        this.galleryProvider.getImageIdsOfStudent("-Ketn4qOsNQOA0vSjZRC", "StudentId").subscribe(snapshot => {
            console.log(snapshot)
        })
    }
}
