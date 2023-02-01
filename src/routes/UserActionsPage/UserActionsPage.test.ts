import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { PATHS } from "../../constants";
import {
  setupEditedUserHandlers,
  setupUserDeleteHandlers,
  setupUserHandlers,
  setupUsersHandlers,
  setupUsersPostHandlers,
} from "tests/mswHandlers";
import {
  authContextStateMock,
  editedUserMock,
  editedUsersMock,
  newUserMock,
  restUsers,
  updatedUsersMock,
  userMock,
  usersMock,
} from "tests/moks";

import "tests/setupTests";

describe("User actions page", () => {
  it("should create new user", async () => {
    setupUsersHandlers();
    setupUsersPostHandlers();
    setupUserHandlers(newUserMock.id, newUserMock);

    const { getByText, getByPlaceholderText, getByTestId, getAllByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/users/${newUserMock.id}/${PATHS.NEW}`],
      });

    const newUserPageTitle = await waitFor(() => getByText(/user new/i));
    const saveButton = await waitFor(() => getByText("Save"));
    const usersList = await waitFor(() => getAllByTestId("userItem"));

    expect(newUserPageTitle).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(usersList).toHaveLength(usersMock.length);

    const nameInput = getByPlaceholderText("Name");
    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Example@.com");
    const phoneInput = getByPlaceholderText("123-456-7890");
    const websiteInput = getByPlaceholderText("example.com");
    const streetInput = getByPlaceholderText("Street");
    const suiteInput = getByPlaceholderText("Suite");
    const cityInput = getByPlaceholderText("City");
    const zipcodeInput = getByPlaceholderText("Zipcode");

    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(websiteInput).toBeInTheDocument();
    expect(streetInput).toBeInTheDocument();
    expect(suiteInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(zipcodeInput).toBeInTheDocument();

    expect(nameInput).toBeRequired();
    expect(usernameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(phoneInput).toBeRequired();
    expect(websiteInput).toBeRequired();
    expect(streetInput).toBeRequired();
    expect(suiteInput).toBeRequired();
    expect(cityInput).toBeRequired();
    expect(zipcodeInput).toBeRequired();

    expect(nameInput).toBeEmptyDOMElement();
    expect(usernameInput).toBeEmptyDOMElement();
    expect(emailInput).toBeEmptyDOMElement();
    expect(phoneInput).toBeEmptyDOMElement();
    expect(websiteInput).toBeEmptyDOMElement();
    expect(streetInput).toBeEmptyDOMElement();
    expect(suiteInput).toBeEmptyDOMElement();
    expect(cityInput).toBeEmptyDOMElement();
    expect(zipcodeInput).toBeEmptyDOMElement();

    userEvent.type(nameInput, newUserMock.name);
    userEvent.type(usernameInput, newUserMock.username);
    userEvent.type(emailInput, newUserMock.email);
    userEvent.type(phoneInput, newUserMock.phone);
    userEvent.type(websiteInput, newUserMock.website);
    userEvent.type(streetInput, newUserMock.address.street);
    userEvent.type(suiteInput, newUserMock.address.suite);
    userEvent.type(cityInput, newUserMock.address.city);
    userEvent.type(zipcodeInput, newUserMock.address.zipcode);

    setupUsersHandlers(updatedUsersMock);

    userEvent.click(saveButton);

    const userPage = await waitFor(() => getByTestId("userPage"));
    const usersListUpdated = await waitFor(() => getAllByTestId("userItem"));
    const [lastUser] = usersListUpdated.reverse();

    expect(usersListUpdated).toHaveLength(updatedUsersMock.length);
    expect(userPage).toBeInTheDocument();
    expect(lastUser).toHaveClass("active");
    expect(lastUser).toHaveTextContent(newUserMock.name);
  });

  it("should edit user", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);
    setupEditedUserHandlers(editedUserMock.id);

    const { getByText, getByPlaceholderText, getByTestId, getAllByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/users/${userMock.id}/${PATHS.EDIT}`],
      });

    const newUserPageTitle = await waitFor(() => getByText(/user edit/i));
    const saveButton = await waitFor(() => getByText("Save"));
    const usersList = await waitFor(() => getAllByTestId("userItem"));
    const [firstUser] = usersList;

    expect(newUserPageTitle).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(firstUser).toHaveClass("active");
    expect(firstUser).toHaveTextContent(userMock.name);

    const nameInput = getByPlaceholderText("Name");
    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Example@.com");
    const phoneInput = getByPlaceholderText("123-456-7890");
    const websiteInput = getByPlaceholderText("example.com");
    const streetInput = getByPlaceholderText("Street");
    const suiteInput = getByPlaceholderText("Suite");
    const cityInput = getByPlaceholderText("City");
    const zipcodeInput = getByPlaceholderText("Zipcode");

    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(websiteInput).toBeInTheDocument();
    expect(streetInput).toBeInTheDocument();
    expect(suiteInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(zipcodeInput).toBeInTheDocument();

    expect(nameInput).toBeRequired();
    expect(usernameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(phoneInput).toBeRequired();
    expect(websiteInput).toBeRequired();
    expect(streetInput).toBeRequired();
    expect(suiteInput).toBeRequired();
    expect(cityInput).toBeRequired();
    expect(zipcodeInput).toBeRequired();

    expect(nameInput).toHaveValue(userMock.name);
    expect(usernameInput).toHaveValue(userMock.username);
    expect(emailInput).toHaveValue(userMock.email);
    expect(phoneInput).toHaveValue(userMock.phone);
    expect(websiteInput).toHaveValue(userMock.website);
    expect(streetInput).toHaveValue(userMock.address.street);
    expect(suiteInput).toHaveValue(userMock.address.suite);
    expect(cityInput).toHaveValue(userMock.address.city);
    expect(zipcodeInput).toHaveValue(userMock.address.zipcode);

    userEvent.type(nameInput, editedUserMock.name);
    userEvent.type(usernameInput, editedUserMock.username);
    userEvent.type(emailInput, editedUserMock.email);
    userEvent.type(phoneInput, editedUserMock.phone);
    userEvent.type(websiteInput, editedUserMock.website);
    userEvent.type(streetInput, editedUserMock.address.street);
    userEvent.type(suiteInput, editedUserMock.address.suite);
    userEvent.type(cityInput, editedUserMock.address.city);
    userEvent.type(zipcodeInput, editedUserMock.address.zipcode);

    setupUsersHandlers(editedUsersMock);
    setupUserHandlers(editedUserMock.id, editedUserMock);

    userEvent.click(saveButton);

    const userPage = await waitFor(() => getByTestId("userPage"));
    const usersListUpdated = await waitFor(() => getAllByTestId("userItem"));
    const [editedFirstUser] = usersListUpdated;

    expect(editedFirstUser).toHaveClass("active");
    expect(editedFirstUser).toHaveTextContent(editedUserMock.name);
    expect(userPage).toBeInTheDocument();
  });

  it("should delete user", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);
    setupUserDeleteHandlers(userMock.id);

    window.confirm = jest.fn(() => true);
    const { getByText, getAllByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
      });

    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(deleteButton).toBeInTheDocument();

    setupUsersHandlers(restUsers);

    userEvent.click(deleteButton);

    expect(window.confirm).toBeCalledTimes(1);

    const usersPageTitle = await waitFor(() => getByText(/users page/i));
    const usersList = await waitFor(() => getAllByTestId("userItem"));

    expect(usersPageTitle).toBeInTheDocument();
    expect(usersList).toHaveLength(restUsers.length);
  });

  it("should rout back", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getByText, getByTestId } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [
          `/${PATHS.USERS}/${userMock.id}`,
          `/${PATHS.USERS}/${userMock.id}/${PATHS.EDIT}`,
        ],
      }
    );

    const cancelButton = await waitFor(() => getByText("Cancel"));

    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    const userPage = await waitFor(() => getByTestId("userPage"));

    expect(userPage).toBeInTheDocument();
  });
});
