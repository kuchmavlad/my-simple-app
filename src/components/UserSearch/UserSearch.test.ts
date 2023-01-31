import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { setupUsersHandlers } from "tests/mswHandlers";
import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { authContextStateMock, usersMock, userMock } from "tests/moks";

import "tests/setupTests";

describe("Search component", () => {
  it("should render component", async () => {
    setupUsersHandlers();

    const { getByPlaceholderText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: ["/users"],
      }
    );

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));

    expect(searchInput).toBeInTheDocument();
  });
  it("should return filtered users", async () => {
    setupUsersHandlers();

    const { queryAllByTestId, getByPlaceholderText, getByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: ["/users"],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));
    const usersList = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersList).toHaveLength(usersMock.length);

    setupUsersHandlers([userMock]);

    userEvent.type(searchInput, "1");
    expect(searchInput).toHaveValue("1");

    const spinner = await waitFor(() => getByTestId("search-spinner"));
    await waitForElementToBeRemoved(spinner);

    const usersListUpdated = await waitFor(() => queryAllByTestId("userItem"));
    expect(usersListUpdated).toHaveLength(1);
  });
  it("should return filtered empty users", async () => {
    setupUsersHandlers();

    const { queryAllByTestId, getByPlaceholderText, getByText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: ["/users"],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));
    const usersList = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersList).toHaveLength(usersMock.length);

    setupUsersHandlers([]);

    userEvent.type(searchInput, "1");

    expect(searchInput).toHaveValue("1");

    const emptyListText = await waitFor(() => getByText(/no contacts/i));
    const usersListUpdated = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersListUpdated).toHaveLength(0);
    expect(emptyListText).toBeInTheDocument();
  });
});
