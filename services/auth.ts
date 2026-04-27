import { ApiClient } from "../core/api/ApiClient.js";   
import {LoginResponse, UserDetailsResponse} from "../models/auth.js";
import {accountConfig} from "../utilities/api/env.js";

const endpoint = accountConfig.baseurl;

export class AuthService
{

    constructor(private api: ApiClient,
        private headers: Record<string, string>) {}


    async login(username:string, password:string)
    {
        const request_payload = {
            "username" : username,
            "password": password
        }
        const url = `${endpoint}/auth/login`;
        return this.api.post<LoginResponse>(url,{data:request_payload})

    }

    async buildAuthHeader(token:string)
    {
         return {...this.headers,
            Authorization: `Bearer ${token}`
        }
    }

    async getDetails(token:string)
    {
        const url = `${endpoint}/auth/me`;
    
        return this.api.get<UserDetailsResponse>(url, {headers: await this.buildAuthHeader(token)})
    }
}
