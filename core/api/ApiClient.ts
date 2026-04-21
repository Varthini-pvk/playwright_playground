import { APIRequestContext } from "@playwright/test";
import { isDebug } from '../../utilities/api/env.js';

export type APIResponse<T> = {
    status:number;
    headers: Record<string, string>;
    body: T | null
    }

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
};

 type httpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'   

export class ApiClient{
    constructor(private request:APIRequestContext){}

    private async httprequests<T>(method: httpMethod, url:string, options?:RequestOptions   ) :Promise<APIResponse<T>>
    {
        if (isDebug) 
        {
        console.log("👉 REQUEST");
        console.log("URL:", url);
        console.log("Headers:", {
        ...options?.headers
        });
         }

        const response =  await this.request[method](url,options);

        let body: T | null = null;
        const contentType = response.headers()['content-type']; 
        if (response.status() !== 204 && contentType?.includes('application/json')) {
            try {
                body = await response.json();
            } catch (e) {
                console.error(`Failed to parse JSON from ${url}:`, e);
                body = null;
            }
        }
    

        return {
            status: response.status(),
            headers: response.headers(),
            body
        };
    } 

    async get<T>(url:string, options?: RequestOptions)
    {
        return this.httprequests<T>('get', url,options) 
    }

    async post<T>(url:string, options?:RequestOptions)
    {
        return this.httprequests<T>('post', url,options) 
    }

    async put<T>(url:string, options?:RequestOptions)
    {
        return this.httprequests<T>('put', url,options) 
    }

    async patch<T>(url:string, options?:RequestOptions)
    {
        return this.httprequests<T>('patch', url,options) 
    }

    async delete<T>(url:string, options?:RequestOptions)
    {
        return this.httprequests<T>('delete', url,options) 
    }
 
}