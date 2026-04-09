import { test,expect } from '@playwright/test';

const test_uri= "https://reqres.in/api"
const test_key = 'reqres_a843a2b8641945cda0b7207e6a613c0a'
const user_endpoint = "users";
let userid = null;
test("To validate get users", async({request}) => {
    const page_number = 2
    const url = `${test_uri}/${user_endpoint}?page=${page_number}`;
    const response = await request.get(url, {headers: {'x-api-key': test_key}})
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.page).toBe(page_number)
    expect(body.data.length).toBeGreaterThanOrEqual(1)
    expect(body.data[0].email).toBeDefined();
   const is_useremails_valid: boolean = body.data.every(user => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email));
   expect(is_useremails_valid).toBeTruthy();

})

test("To validate the error code for invalid path", async({request}) => {
    const invalid_user_endpoint = "unknown/99";
    const page_number = 2
    const url = `${test_uri}/${invalid_user_endpoint}?page=${page_number}`;
    const response = await request.get(url, {headers: {'x-api-key': test_key}})
    expect(response.status()).toBe(404);
})

test ("To validate create user", async({request}) => {
   const url = `${test_uri}/${user_endpoint}`;
   const request_payload = {
    name: "Varthini",
    skills: ["JS", "Playwright"],
    details: {
    experience: 3,  job:"sdet"
    }
   }
   const response  = await request.post(url,{data:request_payload, headers:{'x-api-key': test_key}});
   const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.name).toBe(request_payload.name);
    expect(body.details.job).toBe(request_payload.details.job);
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
    userid = body.id;
   

})

test("To validate update user", async({request}) => {
    const url = `${test_uri}/${user_endpoint}/${userid}`;
    const request_payload = {
    skills: ["JS", "Playwright", "AI"],
    details: {
    experience: 8,
    job:"Lead sdet"
    }
   }
   const response  = await request.put(url,{data:request_payload, headers:{'x-api-key': test_key}});
   const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.details.job).toBe(request_payload.details.job); 
    expect(body.skills).toBe(request_payload.skills); 
    expect(body.updatedAt).toBeDefined();
})

test("To validate delete user", async({request}) => {
    const url = `${test_uri}/${user_endpoint}/${userid}`;
    const response  = await request.delete(url,{headers:{'x-api-key': test_key}});
    expect(response.status()).toBe(204);
})
