import {test} from '@playwright/test';
import {readFileSync} from 'fs';
import {upload_path} from '../utilities/paths';
import {resolve} from 'node:path';
import {UserProfile,readResponse} from '../utilities/apiResponse';
import {UserProfiles, readResponse_zod} from '../utilities/apiResponse_zod';
import users from '../resources/sample-json.json' assert {type: 'json'};

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

test.only("To validate json import", async() => {
    type userProfile = {
        id: number,
        lastLogin: string,
        balance: string
    }

    const usersProfile = users as userProfile[];
    console.log(new Date(usersProfile[0].lastLogin).getFullYear());

})