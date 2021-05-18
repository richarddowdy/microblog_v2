// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

// model imports
const User = require("../../models/commentsModel");

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
