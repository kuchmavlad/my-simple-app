import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { PATHS } from "../../constants";
import { setupUsersHandlers } from "tests/unit/mswHandlers";
import { renderWithRouterAndCustomProviderState } from "tests/unit/utils";
import {
  authContextStateMock,
  usersMock,
  filteredUsersMock,
  emptyDataMock,
} from "tests/unit/moks";

import "tests/unit/setupTests";

describe("User search component", () => {
  it("should render component", async () => {
    setupUsersHandlers();

    const { getByPlaceholderText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.USERS}`],
      }
    );

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));

    expect(searchInput).toBeInTheDocument();
  });

  it("should return filtered users", async () => {
    setupUsersHandlers();

    const { queryAllByTestId, getByPlaceholderText, getByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));
    const usersList = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersList).toHaveLength(usersMock.length);

    setupUsersHandlers(filteredUsersMock);

    userEvent.type(searchInput, "1");
    expect(searchInput).toHaveValue("1");

    const spinner = await waitFor(() => getByTestId("search-spinner"));
    await waitForElementToBeRemoved(spinner);

    const usersListUpdated = await waitFor(() => queryAllByTestId("userItem"));
    expect(usersListUpdated).toHaveLength(filteredUsersMock.length);
  });

  it("should return filtered empty users", async () => {
    setupUsersHandlers();

    const { queryAllByTestId, getByPlaceholderText, getByText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));
    const usersList = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersList).toHaveLength(usersMock.length);

    setupUsersHandlers(emptyDataMock);

    userEvent.type(searchInput, "1");

    expect(searchInput).toHaveValue("1");

    const emptyListText = await waitFor(() => getByText(/no contacts/i));
    const usersListUpdated = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersListUpdated).toHaveLength(emptyDataMock.length);
    expect(emptyListText).toBeInTheDocument();
  });
});
