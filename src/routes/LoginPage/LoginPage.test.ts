import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { emptyDataMock, userMock } from "tests/unit/moks";
import {
  renderWithRouter,
  renderWithRouterAndProvider,
} from "tests/unit/utils";
import {
  setupUserLoginHandlers,
  setupUsersHandlers,
} from "tests/unit/mswHandlers";
import { PATHS } from "../../constants";

import "tests/unit/setupTests";

describe("Login page", () => {
  it("should render login page", () => {
    const { getByText, getByTestId } = renderWithRouter(undefined, {
      initialEntries: [PATHS.LOGIN],
    });
    const loginPageTitle = getByText(/login page/i);
    const loginLink = getByTestId("loginLink");

    expect(loginPageTitle).toBeInTheDocument();
    expect(loginLink).toHaveClass("active");
  });

  it("should redirect to home page after login", async () => {
    setupUserLoginHandlers();

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, { initialEntries: [PATHS.LOGIN] });

    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");
    const homeLink = getByText(/home/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmptyDOMElement();
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
    setupUserLoginHandlers();
    setupUsersHandlers();

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const emailInput = await waitFor(() =>
      getByPlaceholderText(/example@.com/i)
    );
    const loginButton = getByTestId("loginButton");
    const usersLink = getByText(/users/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmptyDOMElement();
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
    setupUserLoginHandlers();

    const { getByPlaceholderText, getByTestId, getByText } =
      renderWithRouterAndProvider(undefined, { initialEntries: [PATHS.LOGIN] });

    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");
    const loginLink = getByTestId("loginLink");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmptyDOMElement();
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
    setupUserLoginHandlers(emptyDataMock);

    const { getByPlaceholderText, getByTestId } = renderWithRouterAndProvider(
      undefined,
      { initialEntries: [PATHS.LOGIN] }
    );
    window.alert = jest.fn();
    const nonExistentEmail = "e2e@email.com";
    const emailInput = getByPlaceholderText(/example@.com/i);
    const loginButton = getByTestId("loginButton");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEmptyDOMElement();

    userEvent.type(emailInput, nonExistentEmail);
    expect(emailInput).toHaveValue(nonExistentEmail);
    userEvent.click(loginButton);

    await waitFor(() => expect(window.alert).toBeCalledTimes(1));
  });
});
