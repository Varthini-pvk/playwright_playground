import { ApiClient } from "../core/api/ApiClient.js";   
import {User, UsersResponse, UpdateUserResponse} from "../models/users.js"

const test_uri= "https://reqres.in/api"
const user_endpoint   = "users";
const url = `${test_uri}/${user_endpoint}`



export class UserService{
     constructor(private api: ApiClient,
        private headers: Record<string, string>) {}


    async getUser(page: number)
    {
        return this.api.get<UsersResponse>(url,{headers: this.headers, params: { page: page}});
    }

    async createUser(payload: object)
    {
        return this.api.post<User>(url,{headers: this.headers, data:payload});
    }

    async updateUser(payload: object, userId: number)
    {
        return this.api.put<UpdateUserResponse>(`${url}/${userId}`,{headers: this.headers, data:payload});
    }

    async deleteUser(userId: number)
    {
        return this.api.delete<null>(`${url}/${userId}`,{headers: this.headers});
    }


}
