import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { userMock } from "tests/moks";
import { renderWithRouter, renderWithRouterAndProvider } from "tests/utils";
import {
  setupUserLoginEmptyHandlers,
  setupUserLoginHandlers,
  setupUsersHandlers,
} from "tests/mswHandlers";

import "tests/setupTests";

describe("Login page", () => {
  it("should render login page", () => {
    const { getByText, getByTestId } = renderWithRouter(undefined, {
      initialEntries: ["/login"],
    });
    const loginPageTitle = getByText(/login page/i);
    const loginLink = getByTestId("loginLink");

    expect(loginPageTitle).toBeInTheDocument();
    expect(loginLink).toHaveClass("active");
  });

  it("should redirect to home page after login", async () => {
    setupUserLoginHandlers(userMock.email);

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, { initialEntries: ["/login"] });

    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");
    const homeLink = getByText(/home/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmpty();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).not.toHaveClass("active");

    userEvent.type(emailInput, userMock.email);
    expect(emailInput).toHaveValue(userMock.email);

    userEvent.click(loginButton);

    const homePageTitle = await waitFor(() => getByText(/my simple app/i));

    expect(homePageTitle).toBeInTheDocument();
    expect(homeLink).toHaveClass("active");
  });

  it("should redirect to previous page after login", async () => {
    setupUserLoginHandlers(userMock.email);
    setupUsersHandlers();

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, {
        initialEntries: ["/users"],
      });

    const emailInput = await waitFor(() =>
      getByPlaceholderText(/example@.com/i)
    );
    const loginButton = getByTestId("loginButton");
    const usersLink = getByText(/users/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmpty();
    expect(usersLink).toBeInTheDocument();
    expect(usersLink).not.toHaveClass("active");

    userEvent.type(emailInput, userMock.email);
    expect(emailInput).toHaveValue(userMock.email);

    userEvent.click(loginButton);

    const usersPageTitle = await waitFor(() => getByText(/users page/i));

    expect(usersPageTitle).toBeInTheDocument();
    expect(usersLink).toHaveClass("active");
  });

  it("should change login to icon after login", async () => {
    setupUserLoginHandlers(userMock.email);

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, { initialEntries: ["/login"] });

    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");
    const loginLink = getByTestId("loginLink");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmpty();
    expect(loginLink).toBeInTheDocument();

    userEvent.type(emailInput, userMock.email);
    expect(emailInput).toHaveValue(userMock.email);

    userEvent.click(loginButton);

    const homePageTitle = await waitFor(() => getByText(/my simple app/i));
    const loginIcon = getByTestId("loginIcon");

    expect(homePageTitle).toBeInTheDocument();
    expect(loginIcon).toBeInTheDocument();
  });

  it("should show 'not found' error", async () => {
    const nonExistentEmail = "test@email.com";
    setupUserLoginEmptyHandlers(nonExistentEmail);

    const { getByPlaceholderText, getByTestId } = renderWithRouterAndProvider(
      undefined,
      { initialEntries: ["/login"] }
    );

    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmpty();

    userEvent.type(emailInput, nonExistentEmail);
    expect(emailInput).toHaveValue(nonExistentEmail);

    window.alert = jest.fn();

    userEvent.click(loginButton);

    await waitFor(() => expect(window.alert).toBeCalledTimes(1));
  });
});
