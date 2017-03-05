# kinder-mobile

## Installation Reminder:
After `npm install`, delete  `firebase.d.ts` in `/node_modules/firebase` folder. Because it is a duplicate of `app.d.ts` in that folder, which causes 'Duplicate Identifiers' error.  

## Use:
- Run `npm run ionic:run` script to run on browsers because `npm run ionic:serve` is incompatible with Cordova's Camera plugin.  
- If you are getting an error, try running `npm run ionic:build` before running `npm run ionic:run`.  
- Always refresh your page with `CTRL+F5` on Google Chrome to force a cache refresh.  

## Documentation:
- User Interactions (Use cases): https://drive.google.com/file/d/0B_YxK0Acwu_XX2l3T3dqUzdOYnc/view?usp=sharing
- Entity multiplicities (Class diagram): https://drive.google.com/file/d/0B_YxK0Acwu_XXzZraV9KQXR0aXM/view?usp=sharing
