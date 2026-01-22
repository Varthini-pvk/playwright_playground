"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var path_1 = require("path");
(0, test_1.test)("To validate dropdown", function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var practiceFile, country_dropdown, dropdown, drop_down_option, multi_select, dropdown_2;
    var page = _b.page;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                practiceFile = path_1.default.resolve(__dirname, "../resources/playwright-dropdown-practice.html");
                return [4 /*yield*/, page.goto('file://' + practiceFile)];
            case 1:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.url()).toContain("playwright-dropdown-practice.html")
                    // //select a option 
                ];
            case 2:
                _c.sent();
                country_dropdown = page.locator('#country');
                return [4 /*yield*/, country_dropdown.selectOption({ value: "IN" })];
            case 3:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(country_dropdown).toHaveValue("IN")];
            case 4:
                _c.sent();
                return [4 /*yield*/, country_dropdown.selectOption({ label: "United Kingdom" })];
            case 5:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(country_dropdown).toHaveValue("GB")];
            case 6:
                _c.sent();
                return [4 /*yield*/, country_dropdown.selectOption({ index: 1 })];
            case 7:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(country_dropdown).toHaveValue("US")];
            case 8:
                _c.sent();
                dropdown = page.locator("#city-dropdown");
                return [4 /*yield*/, dropdown.click()];
            case 9:
                _c.sent();
                drop_down_option = page.getByText("Chennai");
                return [4 /*yield*/, (0, test_1.expect)(drop_down_option).toBeVisible()];
            case 10:
                _c.sent();
                return [4 /*yield*/, drop_down_option.click()];
            case 11:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(dropdown).toHaveText("Chennai")
                    // //Multi-select
                ];
            case 12:
                _c.sent();
                multi_select = page.locator("#fruits");
                return [4 /*yield*/, multi_select.selectOption([{ value: 'apple' }, { label: 'Mango' }])];
            case 13:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.locator("#fruits-selected")).toHaveText("Apple, Mango")];
            case 14:
                _c.sent();
                dropdown_2 = page.locator("#district-dropdown");
                return [4 /*yield*/, dropdown_2.click()];
            case 15:
                _c.sent();
                return [4 /*yield*/, page.getByText("Madurai").click()];
            case 16:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.locator("#district-selected")).toHaveText("Madurai")
                    //Combobox
                ];
            case 17:
                _c.sent();
                //Combobox
                return [4 /*yield*/, page.getByRole("combobox", { name: 'Select state' }).click];
            case 18:
                //Combobox
                _c.sent();
                return [4 /*yield*/, page.getByRole("option", { name: 'Kerala' }).click];
            case 19:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.locator("#state-selected")).toHaveText("Kerala")
                    // Searchable dropdown
                ];
            case 20:
                _c.sent();
                // Searchable dropdown
                return [4 /*yield*/, page.locator("#search-city").fill("Beng")];
            case 21:
                // Searchable dropdown
                _c.sent();
                return [4 /*yield*/, page.locator("#search-results").locator("li:has-text('Bengaluru')").click()];
            case 22:
                _c.sent();
                return [4 /*yield*/, (0, test_1.expect)(page.locator("#search-selected")).toHaveText("Bengaluru")];
            case 23:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
