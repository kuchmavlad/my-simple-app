import "@testing-library/jest-dom";
import { getAllByTestId, waitFor } from "@testing-library/react";

import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { authContextStateMock, usersMock } from "tests/moks";
import { setupUsersHandlers } from "tests/mswHandlers";
import { PATHS } from "../../constants";

import "tests/setupTests";

describe("Users list component", () => {
  it("should render list with users", async () => {
    setupUsersHandlers();

    const { getAllByTestId, getByText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const usersList = await waitFor(() => getAllByTestId("userItem"));
    const [{ name: firstUserName }] = usersMock;
    const firstUserElement = getByText(firstUserName);

    expect(usersList).toHaveLength(usersMock.length);
    expect(firstUserElement).toBeInTheDocument();
  });
  it("should render list without users", async () => {
    setupUsersHandlers([]);

    const { getByText, queryAllByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const usersList = await waitFor(() => queryAllByTestId("userItem"));
    const emptyListText = await waitFor(() => getByText(/no contacts/i));

    expect(usersList).toHaveLength(0);
    expect(emptyListText).toBeInTheDocument();
  });
});
