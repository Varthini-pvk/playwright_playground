import { test,expect } from '@playwright/test';
import { ApiClient, APIResponse } from "../../core/api/ApiClient.js";
import { UserService } from '../../services/User.js'

let userId: number | null = null;

test("To validate get users", async({request}) => {

    const api = new ApiClient(request);
    const userServiceInstance = new UserService(api);
    const page_number = 2;
    const getResponse = await userServiceInstance.getUser(page_number)
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.page).toBe(page_number)
    expect(getResponse.body).toHaveProperty('data')
    expect(getResponse.body.data.length).toBeGreaterThanOrEqual(1)
   getResponse.body.data.forEach((user) => 
   {
    expect(user.email, `User email is invalid - ${user.email}`).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(user.id,`Missing id for user ${user.email}`).toBeDefined()}
    );
   expect(getResponse.headers['content-type']).toContain('application/json');

})

// test("To validate the error code for invalid path", async({request}) => {
//     const invalid_user_endpoint = "unknown/99";
//     const page_number: number = 2
//     const url = `${test_uri}/${invalid_user_endpoint}`;
//     const response = await request.get(url, {headers: headers,params: { page: page_number}})
//     expect(response.status()).toBe(404);
// })

test ("To validate create user", async({request}) => {

    const api = new ApiClient(request);
    const userServiceInstance = new UserService(api);
    const request_payload = {
    name: "Varthini",
    skills: ["JS", "Playwright"],
    details: {
    experience: 3,  job:"sdet"
    }
   }
   const response  = await userServiceInstance.createUser(request_payload);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(request_payload.name);
    expect(response.body.details?.job).toBe(request_payload.details.job);
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    userId = response.body.id;
})

test("To validate update user", async({request}) => {

    const api = new ApiClient(request);
    const userServiceInstance = new UserService(api);

    const request_payload = {
    skills: ["JS", "Playwright", "AI"],
    details: {
    experience: 8,
    job:"Lead sdet"
    }
    }

    const response  = await userServiceInstance.updateUser(request_payload,userId);
    expect(response.status).toBe(200);
    expect(response.body.details?.job).toBe(request_payload.details.job); 
    expect(response.body.skills).toMatchObject(request_payload.skills); 
    expect(response.body.updatedAt).toBeDefined();
    })

test("To validate delete user", async({request}) => {
   const api = new ApiClient(request);
    const userServiceInstance = new UserService(api);
    const response  = await userServiceInstance.deleteUser(userId);
    expect(response.status).toBe(204);
})
