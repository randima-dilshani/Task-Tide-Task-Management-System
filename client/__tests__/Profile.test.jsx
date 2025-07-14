import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../src/components/User/Profile";
import { MemoryRouter } from "react-router-dom";

// Mock localStorage
const mockUser = {
  username: "randima",
  email: "randima@example.com",
  createdAt: "2023-07-01T12:00:00Z",
};

beforeEach(() => {
  localStorage.setItem("userProfile", JSON.stringify({ user: mockUser }));
});

afterEach(() => {
  localStorage.clear();
});

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Profile Component", () => {
  test("renders user profile info from localStorage", () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("randima")).toBeInTheDocument();
    expect(screen.getByText("randima@example.com")).toBeInTheDocument();
    expect(screen.getByText("7/1/2023")).toBeInTheDocument(); // Date format may vary
  });

  test("shows message when no user data", () => {
    localStorage.clear();
    renderWithRouter(<Profile />);
    expect(screen.getByText("No profile data")).toBeInTheDocument();
  });

  test("shows back button", () => {
    renderWithRouter(<Profile />);
    expect(
      screen.getByRole("button", { name: /back to dashboard/i })
    ).toBeInTheDocument();
  });
});
