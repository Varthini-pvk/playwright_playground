import {User } from '../../models/users.js'
import {expect} from '@playwright/test'

export class UserValidator{
    static validateUser(user:User)
    {
        expect(user).toBeDefined();

        expect(user.id).toBeDefined();

        expect(typeof user.id).toBe('number');

        expect(typeof user.email).toBe('string');

        expect(user.email).toContain('@');

        expect(typeof user.first_name).toBe('string');

        expect(typeof user.last_name).toBe('string');
    }
}