import { ApiClient } from "../core/api/ApiClient.js";   
import {User, UsersResponse, UpdateUserResponse} from "../models/users.js"

const test_uri= "https://reqres.in/api"
const test_key = 'reqres_a843a2b8641945cda0b7207e6a613c0a'
const user_endpoint   = "users";
const url = `${test_uri}/${user_endpoint}`
const headers = {
    'x-api-key': test_key
} 


export class UserService{
     constructor(private api: ApiClient) {}


    async getUser(page: number)
    {
        return this.api.get<UsersResponse>(url,{headers: headers, params: { page: page}});
    }

    async createUser(payload: object)
    {
        return this.api.post<User>(url,{headers: headers, data:payload});
    }

    async updateUser(payload: object, userId: number)
    {
        return this.api.put<UpdateUserResponse>(`${url}/${userId}`,{headers: headers, data:payload});
    }

    async deleteUser(userId: number)
    {
        return this.api.delete<null>(`${url}/${userId}`,{headers: headers});
    }


}
