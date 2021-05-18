const createToken = require("../../helpers/createToken");

const user = { username: "testUser", is_admin: false, id: 1 };

test("should return a JWT token", () => {
  let newJWT = createToken(user);
  expect(newJWT.length > 10);
  expect(newJWT).toEqual(expect.any(String));
});
