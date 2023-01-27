import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupUserHandlers, setupUsersHandlers } from "tests/mswHandlers";
import { renderWithRouterAndCustomProviderState } from "tests/utils";
import { authContextStateMock, userMock } from "tests/moks";

import "tests/setupTests";

describe("User page", () => {
  it("should render user page", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getAllByTestId, getByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/users/${userMock.id}`],
      });

    const [firstUserLink] = await waitFor(() => getAllByTestId("userItem"));

    const userPage = await waitFor(() => getByTestId("userPage"));
    expect(userPage).toBeInTheDocument();
    expect(firstUserLink).toHaveClass("active");
  });
  it("should rout to new user page", async () => {
    setupUsersHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: ["/users"],
      }
    );

    const newButton = await waitFor(() => getByText("New"));

    userEvent.click(newButton);

    const newUserPageTitle = await waitFor(() => getByText(/user new/i));

    expect(newUserPageTitle).toBeInTheDocument();
  });
  it("should rout to edit user page", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/users/${userMock.id}`],
      }
    );

    const editButton = await waitFor(() => getByText("Edit"));

    userEvent.click(editButton);

    const editUserTitle = await waitFor(() => getByText(/user edit/i));

    expect(editUserTitle).toBeInTheDocument();
  });
  it("should rout to posts page", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/users/${userMock.id}`],
      }
    );

    const myPostsButton = await waitFor(() => getByText("My posts"));

    userEvent.click(myPostsButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsPageTitle).toBeInTheDocument();
  });
});
