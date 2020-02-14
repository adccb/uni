const { isOnTeam, isValid } = require("../validations");

jest.mock(
  "../../config.json",
  () => ({
    teammates: ["charlie brown", "mr. t", "fran drescher"],
    blacklist: [1, 2, 3]
  }),
  { virtual: true }
);

describe("isOnTeam", () => {
  it("returns true if string is in teammates array", () => {
    expect(isOnTeam("charlie brown")).toBe(true);
  });

  it("returns false if string is not in teammates array", () => {
    expect(isOnTeam("this is a test")).toBe(false);
  });
});

describe("isValid", () => {
  const buildPull = (login, number) => ({
    number,
    user: { login }
  });

  it("returns true if pull is valid", () => {
    const validPull = buildPull("mr. t", 20);
    expect(isValid(validPull)).toBe(true);
  });

  it("returns true if pull is valid", () => {
    const invalidTeammate = buildPull("bill clinton", 20);
    expect(isValid(invalidTeammate)).toBe(false);

    const invalidNumber = buildPull("charlie brown", 2);
    expect(isValid(invalidNumber)).toBe(false);

    const invalidBoth = buildPull("alyssa milano", 1);
    expect(isValid(invalidBoth)).toBe(false);
  });
});
