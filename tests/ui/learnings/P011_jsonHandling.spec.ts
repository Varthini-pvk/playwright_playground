import {test} from '@playwright/test';
import {readFileSync} from 'fs';
import {upload_path} from '../../utilities/paths.js';
import {resolve} from 'node:path';
import {UserProfile,readResponse} from '../../utilities/apiResponse.js';
import {UserProfiles, readResponse_zod} from '../../utilities/apiResponse_zod.js';
import users from '../../resources/sample-json.json' with {type: 'json'};

test ("To validate reading from JSON", async() => {

let responseString:string = readFileSync(resolve(upload_path,"sample-json.json"),'utf-8');

let parsedResponse:UserProfile[]  = readResponse(responseString)

console.log(parsedResponse[0].lastLogin.getFullYear());

})

test("To validate response from JSON using zod", async() => {

    let responseString = readFileSync(resolve(upload_path,"sample-json.json"),'utf-8');

    let parsedRespone:UserProfiles = readResponse_zod(responseString)
    console.log(parsedRespone[0].lastLogin.getFullYear());

})

test("To validate json import", async() => {
    type userProfile = {
        id: number,
        lastLogin: string,
        balance: string
    }

    const usersProfile = users as userProfile[];
    console.log(new Date(usersProfile[0].lastLogin).getFullYear());

})

//Data destructuring

test("To test data destructuring of test data", async() => {

type userProfile = {
        id: number,
        lastLogin: string,
        balance: string
    }
 for (const user  of users)
 { 
    const {id, lastLogin, balance } = user 
    console.log(new Date(lastLogin).getFullYear())
}
 

})