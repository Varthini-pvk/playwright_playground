import { APIRequestContext } from "@playwright/test";

export type APIResponse<T> = {
    status:number;
    headers: Record<string, string>;
    body: T | null
    }

 type httpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'   

export class ApiClient{
    constructor(private request:APIRequestContext){}

    private async httprequests<T>(method: httpMethod, url:string, options?:object) :Promise<APIResponse<T>>
    {
        const response =  await this.request[method](url,options);

        let body: T | null = null;

        if (response.status() !== 204) {
            body = await response.json();
        }
    

        return {
            status: response.status(),
            headers: await response.headers(),
            body
        };
    } 

    async get<T>(url:string, options?:object)
    {
        return this.httprequests<T>('get', url,options) 
    }

    async post<T>(url:string, options?:object)
    {
        return this.httprequests<T>('post', url,options) 
    }

    async put<T>(url:string, options?:object)
    {
        return this.httprequests<T>('put', url,options) 
    }

    async patch<T>(url:string, options?:object)
    {
        return this.httprequests<T>('patch', url,options) 
    }

    async delete<T>(url:string, options?:object)
    {
        return this.httprequests<T>('delete', url,options) 
    }
 
}