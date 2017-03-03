# kinder-mobile

## Installation Reminder:
After 'npm install', delete  firebase.d.ts in /node_modules/firebase folder. Because it is a duplicate of 'app.d.ts' in that folder, which causes 'Duplicate Identifiers' error.  
## Use:
Run `ionic:run` script to run on browsers because `ionic:serve` is incompatible with Cordova's Camera plugin.  
If you are getting an error, try running `ionic:build` before running `ionic:run` and refresh your page with CTRL+F5 on Google Chrome.  
