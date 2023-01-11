import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { renderWithRouter, renderWithRouterAndProvider } from "./utils";

const contextState = {
  user: {
    name: "Dev",
    username: "Dev",
    email: "1",
    phone: "1",
    website: "1",
    address: {
      street: "1",
      suite: "1",
      city: "1",
      zipcode: "1",
    },
    id: 1,
  },
  signIn: () => {},
  signOut: () => {},
};

describe("render app", () => {
  it("render on home page", () => {
    const { getByText } = renderWithRouter();
    const homeTitle = getByText(/my simple app/i);
    const homeLink = getByText("Home");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");
  });
});

describe("routing", () => {
  it("routing to posts page", async () => {
    const { getByText } = renderWithRouter();
    const homeTitle = getByText(/my simple app/i);
    const postsLink = getByText("Posts");
    const homeLink = getByText("Home");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");

    userEvent.click(postsLink);
    const postsTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsTitle).toBeInTheDocument();
    expect(postsLink).toHaveClass("active");
  });

  it("routing to users page without authorization", async () => {
    const { getByText } = renderWithRouter();
    const homeTitle = getByText(/my simple app/i);
    const usersLink = getByText("Users");
    const homeLink = getByText("Home");
    const loginLink = getByText("Login");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");

    userEvent.click(usersLink);
    const loginTitle = await waitFor(() => getByText(/login page/i));

    expect(loginTitle).toBeInTheDocument();
    expect(loginLink).toHaveClass("active");
  });

  it("routing to users page with authorization", async () => {
    const { getByText } = renderWithRouterAndProvider(contextState);
    const homeTitle = getByText(/my simple app/i);
    const usersLink = getByText("Users");
    const homeLink = getByText("Home");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");

    userEvent.click(usersLink);
    const userTitle = await waitFor(() => getByText(/users page/i));

    expect(userTitle).toBeInTheDocument();
    expect(usersLink).toHaveClass("active");
  });

  it("routing to login page", async () => {
    const { getByText } = renderWithRouter();
    const homeTitle = getByText(/my simple app/i);
    const homeLink = getByText("Home");
    const loginLink = getByText("Login");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");

    userEvent.click(loginLink);
    const loginTitle = await waitFor(() => getByText(/login page/i));

    expect(loginTitle).toBeInTheDocument();
    expect(loginLink).toHaveClass("active");
  });

  it("routing to wrong path", async () => {
    const { getByText } = renderWithRouter(["/wrongPath"]);
    const errorTitle = getByText(/oops!/i);
    const homeLink = getByText("Home");

    expect(errorTitle).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
  });
});
