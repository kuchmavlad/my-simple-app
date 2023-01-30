import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import {
  setupUsersFilterEmptyHandlers,
  setupUsersFilterHandlers,
  setupUsersHandlers,
} from "tests/mswHandlers";
import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { authContextStateMock } from "tests/moks";

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
    setupUsersFilterHandlers("123");

    const { queryAllByTestId, getByPlaceholderText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: ["/users"],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));

    userEvent.type(searchInput, "123");

    expect(searchInput).toHaveValue("123");

    const usersList = await waitFor(() => queryAllByTestId("userItem"));

    expect(usersList).toHaveLength(1);
  });
  it("should return filtered empty users", async () => {
    setupUsersHandlers();
    setupUsersFilterEmptyHandlers("123");

    const { queryAllByTestId, getByPlaceholderText, getByText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: ["/users"],
      });

    const searchInput = await waitFor(() => getByPlaceholderText("Search"));

    userEvent.type(searchInput, "123");

    expect(searchInput).toHaveValue("123");

    const usersList = await waitFor(() => queryAllByTestId("userItem"));
    const emptyListText = await waitFor(() => getByText(/no contacts/i));

    expect(usersList).toHaveLength(0);
    expect(emptyListText).toBeInTheDocument();
  });
});
