import dotenv from 'dotenv';
import path from 'path';

const test_env = process.env.TestEnv || 'qa';
const envfile = path.resolve(process.cwd(), `config/saucedemo/.env.${test_env}`)
dotenv.config({path: envfile});

 export const accountConfig = {
    baseurl: getEnvDetails('base_url'),
    username: getEnvDetails('email_address'),
    password: getEnvDetails('password'),
 }

 function getEnvDetails(varName: string)
 {

   const value = process.env[varName]
   if (!value)
   {
       throw new Error(`Missing environment variable: ${varName}`);
   }
   return value;
 }
