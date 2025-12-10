import {
  isUserLoggedIn,
  loginUser,
  logoutUser,
} from "../auth-login/AuthService";

describe("AuthService Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("logs in successfully", () => {
    const result = loginUser("sak123@gmail.com", "khera123");
    expect(result.success).toBe(true);
    expect(localStorage.getItem("token")).toBe("mock-jwt-token-12345");
  });

  test("fails  login with wrong credentials", () => {
    const result = loginUser("wrong", "wrong");
    expect(result.success).toBe(false);
  });

  test("logout removes token", () => {
    localStorage.setItem("token", "abc");
    logoutUser();
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("isUserLoggedIn returns correct value", () => {
    expect(isUserLoggedIn()).toBe(false);
    localStorage.setItem("token", "mock-token");
    expect(isUserLoggedIn()).toBe(true);
  });
});
