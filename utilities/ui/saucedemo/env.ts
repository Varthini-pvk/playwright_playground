import {loadenv,getEnvDetails} from '../../envloader.js';

loadenv('ui/saucedemo');
 export const accountConfig = {
    baseurl: getEnvDetails('base_url'),
    username: getEnvDetails('email_address'),
    password: getEnvDetails('password'),
 }
