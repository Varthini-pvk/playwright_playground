import {test} from '@playwright/test';
import {readFileSync} from 'fs';
import {upload_path} from '../../utilities/paths.js';
import {resolve} from 'node:path';
import {UserProfile,loadCSV} from '../../utilities/apiResponse.js';
import {UserProfileSchenma,UserProfilesSchema, loadCSVZod} from '../../utilities/apiResponse_zod.js';


const usersData: UserProfile[]  = loadCSV<UserProfile>(readFileSync(resolve(upload_path,"sample-csv.csv"),'utf-8'));

usersData.forEach(user =>
{
test (`To validate reading from csv-${user.id}`, async() => {

console.log(new Date(user.lastLogin).getFullYear());

})})


const usersDataZod  = loadCSVZod(readFileSync(resolve(upload_path,"sample-csv.csv"),'utf-8'),UserProfileSchenma);

usersDataZod.forEach(user =>
{
test.only(`To validate reading from csv with zod-${user.id}`, async() => {

console.log(new Date(user.lastLogin).getFullYear());

})})
