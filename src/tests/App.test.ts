import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  renderWithRouter,
  renderWithRouterAndCustomProviderState,
} from "./utils";
import { authContextStateMock } from "./moks";
import { setupPostsHandlers, setupUsersHandlers } from "./mswHandlers";

import "./setupTests";

describe("render app", () => {
  it("should render on home page", () => {
    const { getByText } = renderWithRouter();
    const homeTitle = getByText(/my simple app/i);
    const homeLink = getByText("Home");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");
  });
});

describe("routing", () => {
  it("should rout to posts page", async () => {
    setupPostsHandlers();

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

  it("should rout to login page without authorization", async () => {
    setupUsersHandlers();

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

  it("should rout to users page with authorization", async () => {
    setupUsersHandlers();

    const { getByText } =
      renderWithRouterAndCustomProviderState(authContextStateMock);

    const homeTitle = getByText(/my simple app/i);
    const usersLink = getByText("Users");
    const homeLink = getByText("Home");

    expect(homeTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");

    userEvent.click(usersLink);

    const usersTitle = await waitFor(() => getByText(/users page/i));

    expect(usersTitle).toBeInTheDocument();
    expect(usersLink).toHaveClass("active");
  });

  it("should rout to login page", async () => {
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
});
