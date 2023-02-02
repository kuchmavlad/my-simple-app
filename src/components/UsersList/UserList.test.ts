import "@testing-library/jest-dom";
import { getAllByTestId, waitFor } from "@testing-library/react";

import { renderWithRouterAndCustomProviderState } from "tests/unit/utils";
import {
  authContextStateMock,
  emptyDataMock,
  usersMock,
} from "tests/unit/moks";
import { setupUsersHandlers } from "tests/unit/mswHandlers";
import { PATHS } from "../../constants";

import "tests/unit/setupTests";

describe("Users list component", () => {
  it("should render list with users", async () => {
    setupUsersHandlers(usersMock);

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
    setupUsersHandlers(emptyDataMock);

    const { getByText, queryAllByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const usersList = await waitFor(() => queryAllByTestId("userItem"));
    const emptyListText = await waitFor(() => getByText(/no contacts/i));

    expect(usersList).toHaveLength(emptyDataMock.length);
    expect(emptyListText).toBeInTheDocument();
  });
});
