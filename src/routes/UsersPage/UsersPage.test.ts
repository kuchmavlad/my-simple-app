import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndCustomProviderState } from "tests/unit/utils";
import { authContextStateMock, userMock } from "tests/unit/moks";
import { setupUserHandlers, setupUsersHandlers } from "tests/unit/mswHandlers";
import { PATHS } from "../../constants";

import "tests/unit/setupTests";

describe("Users page", () => {
  it("should render users page with authorize", async () => {
    setupUsersHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.USERS}`],
      }
    );

    const usersPageTitle = await waitFor(() => getByText(/users page/i));
    const usersLink = await waitFor(() => getByText("Users"));

    expect(usersPageTitle).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(usersLink).toHaveClass("active");
  });

  it("should rout to user page", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getAllByTestId, getByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}`],
      });

    const [firstUserLink] = await waitFor(() => getAllByTestId("userItem"));

    expect(firstUserLink).not.toHaveClass("active");

    userEvent.click(firstUserLink);

    const userPage = await waitFor(() => getByTestId("userPage"));
    expect(userPage).toBeInTheDocument();
    expect(firstUserLink).toHaveClass("active");
  });
});
