import { expect} from '@playwright/test';
import { test } from '../fixtures/api.fixture.js';
import { ApiClient } from "../../core/api/ApiClient.js";
import { UserService } from '../../services/User.js'
import { UserValidator } from '../../validators/api/user.js';



test("To validate get users", async({userService}) => {
    const page_number = 2;
    const getResponse = await userService.getUser(page_number)
    expect(getResponse.status).toBe(200);
    const body = getResponse.body!;
    expect(body).not.toBeNull();
    expect(body.page).toBe(page_number)
    expect(getResponse.body).toHaveProperty('data')
    expect(Array.isArray(body.data)).toBeTruthy();
    body.data.forEach((user) => 
    {
        expect(user.email, `User email is invalid - ${user.email}`).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(user.id,`Missing id for user ${user.email}`).toBeDefined();
        UserValidator.validateUser(user);
    }
    );
    expect(getResponse.headers['content-type']).toContain('application/json');

})

test("To validate the error code for invalid path", async({userService}) => {
    const invalid_user_endpoint = "unknown/99";
    const response = await userService.getUserCustomURL(invalid_user_endpoint, {page:2})
    expect(response.status).toBe(404);
})

test ("To validate create user", async({userService}) => {

   
    const request_payload = {
    name: "Varthini",
    skills: ["JS", "Playwright"],
    details: {
    experience: 3,  job:"sdet"
    }
   }
   const response  = await userService.createUser(request_payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
    ...request_payload,
    id: expect.any(String),
    createdAt: expect.any(String)
    });
})

test("To validate update user", async({userService,randomUser}) => {

    const createresponse  = await userService.createUser(randomUser);
    expect(createresponse.body?.id).toBeDefined();
    const userId = Number(createresponse.body?.id);

    const request_payload = {
    skills: ["JS", "Playwright", "AI"],
    details: {
    experience: 8,
    job:"Lead sdet"
    }
    }

    const response  = await userService.updateUser(request_payload,userId);
    const body = response.body!;
    expect(body).toMatchObject({
    ...request_payload,
    updatedAt: expect.any(String)
    });
    expect(body.skills).toEqual(
    expect.arrayContaining(request_payload.skills)
    )
})

test("To validate delete user", async({userService,randomUser}) => {
    const createresponse  = await userService.createUser(randomUser);
    expect(createresponse.body?.id).toBeDefined();
    const userId = Number(createresponse.body?.id);

    const response  = await userService.deleteUser(userId);
    expect(response.status).toBe(204);
})
