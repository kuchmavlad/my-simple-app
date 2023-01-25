import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { authContextStateMock, userMock } from "tests/moks";
import { setupUserHandlers, setupUsersHandlers } from "tests/mswHandlers";

import "tests/setupTests";

describe("Users page", () => {
  it("should render users page with authorize", async () => {
    setupUsersHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: ["/users"],
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
        initialEntries: ["/users"],
      });

    const [firstUser] = await waitFor(() => getAllByTestId("userItem"));
    const userLink = firstUser.firstElementChild;

    expect(userLink).not.toHaveClass("active");

    userLink && userEvent.click(userLink);

    const userPage = await waitFor(() => getByTestId("userPage"));
    expect(userPage).toBeInTheDocument();
    expect(userLink).toHaveClass("active");
  });
});
