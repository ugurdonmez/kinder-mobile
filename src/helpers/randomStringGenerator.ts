import { Injectable } from '@angular/core';

@Injectable()
export class RandomStringGenerator{

    // generates random string A-Z
    public get(length){
        let randomString = eval("["+Array(length).join("String.fromCharCode(65+~~(Math.random()*26)),")+",'']").join("");
        // console.log("generated random string: " + randomString);
        return randomString;
    }
}

