import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PATHS } from "../../constants";
import {
  setupPostsHandlers,
  setupUserFavoriteHandlers,
  setupUserHandlers,
  setupUsersHandlers,
} from "tests/mswHandlers";
import {
  renderWithRouterAndCustomProviderState,
  rerenderWithRouterAndCustomProviderState,
} from "tests/utils";
import {
  authContextStateMock,
  favoriteUser,
  favoriteUsersMock,
  userMock,
} from "tests/moks";

import "tests/setupTests";

describe("User page", () => {
  it("should render user page", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getAllByTestId, getByTestId } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
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
        initialEntries: [`/${PATHS.USERS}`],
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
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
      }
    );

    const editButton = await waitFor(() => getByText("Edit"));

    userEvent.click(editButton);

    const editUserTitle = await waitFor(() => getByText(/user edit/i));

    expect(editUserTitle).toBeInTheDocument();
  });

  it("should rout to posts page", async () => {
    setupPostsHandlers();
    setupUsersHandlers();
    setupUserHandlers(userMock.id);

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
      }
    );

    const myPostsButton = await waitFor(() => getByText("My posts"));

    userEvent.click(myPostsButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsPageTitle).toBeInTheDocument();
  });

  it("should choose favorite user", async () => {
    setupUsersHandlers();
    setupUserHandlers(userMock.id);
    setupUserFavoriteHandlers(userMock.id);

    const { getAllByTestId, getByTestId, rerender } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
      });

    const favoriteButton = await waitFor(() => getByTestId("favorite"));
    const usersList = await waitFor(() => getAllByTestId("userItem"));
    const [firstUser] = usersList;
    const firstUserIcon = firstUser.lastElementChild;

    expect(firstUserIcon).not.toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveValue("true");

    setupUsersHandlers(favoriteUsersMock);
    setupUserHandlers(userMock.id, favoriteUser);

    userEvent.click(favoriteButton);

    rerenderWithRouterAndCustomProviderState(
      rerender,
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.USERS}/${userMock.id}`],
      }
    );

    const rerenderUsersList = await waitFor(() => getAllByTestId("userItem"));
    const rerenderFavoriteButton = await waitFor(() => getByTestId("favorite"));
    const [rerenderFirstUser] = rerenderUsersList;
    const rerenderFirstUserIcon = rerenderFirstUser.lastElementChild;

    expect(rerenderFirstUserIcon).toBeInTheDocument();
    expect(rerenderFavoriteButton).toHaveValue("false");
  });
});
