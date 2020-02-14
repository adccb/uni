const { headers } = require("../utils");

describe("headers", () => {
  it("attaches the correct token header", () => {
    const token = "a string";
    expect(headers(token)).toEqual({ Authorization: "token a string" });
  });
});
