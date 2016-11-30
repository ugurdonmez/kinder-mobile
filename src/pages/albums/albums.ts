import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Albums page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html'
})
export class AlbumsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AlbumsPage Page');
  }

}
