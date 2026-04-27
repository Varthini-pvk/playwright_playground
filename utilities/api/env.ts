import {loadenv,getEnvDetails} from '../envloader.js';
loadenv('api');
export const isDebug = getEnvDetails('debugFlag')=='true';
export const api_key = getEnvDetails('test_key');

export const accountConfig = {
    baseurl: getEnvDetails('BASE_URL'),
    username: getEnvDetails('USERNAME'),
    password: getEnvDetails('PASSWORD'),
 }


