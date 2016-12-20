import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
    template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {

      firebase.initializeApp({
            apiKey: "AIzaSyC3ZHNBANkIOGZsJwv4iZyhqUzXnYrz2sk",
            authDomain: "kindergarden-5bcfa.firebaseapp.com",
            databaseURL: "https://kindergarden-5bcfa.firebaseio.com",
            storageBucket: "kindergarden-5bcfa.appspot.com",
            messagingSenderId: "594048241170"
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        Splashscreen.hide();
        });
    }
}
