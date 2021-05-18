// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/usersModel");

const { TEST_DATA, afterEachHook, afterAllHook, beforeEachHook } = require("./config");

beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});

afterEach(async function () {
  await afterEachHook();
});

afterAll(async function () {
  await afterAllHook();
});

describe("GET single users ->  /users", async () => {
  test("find one user", async () => {
    const response = await request(app).get(`/api/users/${TEST_DATA.userId}`);
    console.log(response.type);
    const user = response.body;
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(user.first_name).toBe("tester");
  });
});
