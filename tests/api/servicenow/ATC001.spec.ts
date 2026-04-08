import { test,expect } from '@playwright/test';

const test_uri= "https://reqres.in/api"

test("To validate the users api of given page", async({request}) => {
    const user_endpoint = "users";
    const page_number = 2
    const url = `${test_uri}/${user_endpoint}?page=${page_number}`;
    const response = await request.get(url, {headers: {'x-api-key': 'reqres_a843a2b8641945cda0b7207e6a613c0a'}})
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
    console.log(await response.headers())
    expect(body.page).toBe(2)
    expect(body.data.length).toBeGreaterThanOrEqual(1)
    expect(body.data[0].email).toBeDefined
   const is_useremails_valid: boolean = body.data.every(user => /^\w+@\w+\.com$/.test(user.email));
   expect(is_useremails_valid).toBeTruthy

})

test("To validate the error code for invalid path", async({request}) => {
    const user_endpoint = "unknown/99";
    const page_number = 2
    const url = `${test_uri}/${user_endpoint}?page=${page_number}`;
    const response = await request.get(url, {headers: {'x-api-key': 'reqres_a843a2b8641945cda0b7207e6a613c0a'}})
    expect(response.status()).toBe(404);
})
