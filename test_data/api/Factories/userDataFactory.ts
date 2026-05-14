
import {buildUser} from "../dataBuilder.js";
import {User} from "../../../models/users.js";


export class UserFactory{
static createUser(overrides:Partial<User> = {}){
return {...buildUser(),...overrides};
}
}


