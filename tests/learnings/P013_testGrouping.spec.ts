import {test, expect} from "@playwright/test"
test.describe("To Test order flow", () => {

 let didRun = false;


test.skip(({browserName}) => browserName === "webkit",'UI Issues');

test.beforeAll("Login to the application",  async()=>{
    didRun = true;
    console.log("Logged in to the app")

})

test.beforeEach("Navigate to  PLP", async()=>{
console.log("Navigated to PLP")

})

test("Validate Add to cart from wishlist",{tag: ["@smoke"]},async() => {
console.log("Added product to wishlist")
})

test("Validate Add to Cart from quick view", async() => {
console.log("Added product to cart from quick view")
})


test("Validate Add to cart from PDP", async({}, testInfo) => {
testInfo.annotations.push({ type: 'risk-level', description: 'high' });
console.log("Added product to cart from PDP")
})


test.afterEach("Place order", async({},testInfo) => {
if (testInfo.status === testInfo.expectedStatus) {
console.log("order placed successfully")
 }
})

test.afterAll("logout from app", async() => {

    if (didRun) {
        console.log("Logged out successfully")
    }
})



})