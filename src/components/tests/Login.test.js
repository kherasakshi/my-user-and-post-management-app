import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../auth-login/Login";
import * as AuthService from "../auth-login/AuthService";
import { BrowserRouter } from "react-router-dom";

jest.mock("../auth-login/AuthService");

describe("Login Component Tests", () => {
  test("shows error when fields are empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const errors = await screen.findAllByText("Both fields are required.");
    expect(errors.length).toBeGreaterThan(0);
  });

  test("successful login triggers success snackbar", async () => {
    AuthService.loginUser.mockReturnValue({ success: true });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "sak123@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "khera123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const success = await screen.findByText("Login successful!");
    expect(success).toBeInTheDocument();
  });

  test("invalid login shows error message", async () => {
    AuthService.loginUser.mockReturnValue({
      success: false,
      message: "Invalid email or password",
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "wrong@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const errors = await screen.findAllByText("Invalid email or password");
    expect(errors.length).toBeGreaterThan(0);
  });
});
