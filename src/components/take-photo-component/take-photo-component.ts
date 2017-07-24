import {Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

import {SchoolAdminEditClassPage} from "../school-admin-edit-class/school-admin-edit-class";
import {Translator} from "../../app/translator";
import {TranslateService} from "@ngx-translate/core";
import {InviteOthersPage} from "../invite-others/invite-others";
import {Camera} from "ionic-native";
import {Gallery} from "../../providers/gallery";

@Component({
  selector: 'take-photo-component',
  templateUrl: 'take-photo-component.html',
    providers: [Translator]
})


export class TakePhotoComponent implements OnInit{
    @Input() classId: any;
    private translate: TranslateService;
   private imageUrl: string;


    constructor(public navCtrl: NavController,
                public translator: Translator,
                private galleryProvider: Gallery,
    ) {
    }

    ngOnInit(): void {
        this.translate = this.translator.translatePipe;
       this.galleryProvider.uploadImage(this.classId, Camera.PictureSourceType.CAMERA).then((imageUrl) => {
         this.imageUrl = imageUrl;
       })
    }

   public saveImage(): void{
       this.galleryProvider.saveImage(this.classId, this.imageUrl)
      this.navCtrl.pop()
   }

}
