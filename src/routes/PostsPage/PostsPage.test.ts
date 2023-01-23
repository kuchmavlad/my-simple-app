import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  renderWithRouter,
  renderWithRouterAndCustomProviderState,
} from "tests/utils";
import {
  authContextStateMock,
  postsEmptyMock,
  postsLimitedMock,
  postsMock,
} from "tests/moks";
import {
  setupPostsEmptyHandlers,
  setupPostsHandlers,
  setupPostsLimitedHandlers,
  setupSinglePostHandlers,
} from "tests/mswHandlers";
import { PATHS } from "../../constants";

import "tests/setupTests";

describe("posts page", () => {
  it("should render posts page with posts", async () => {
    setupPostsHandlers();

    const { getAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => getAllByTestId("postItem"));

    expect(posts).toHaveLength(postsMock.length);
    expect(posts[0]).toHaveTextContent(postsMock[0].title);
    expect(posts[0]).toHaveAttribute("href", `/post/${postsMock[0].id}`);
  });

  it("should render posts page without posts", async () => {
    setupPostsEmptyHandlers();

    const { queryAllByTestId, getByText } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => queryAllByTestId("postItem"));
    const emptyMassage = await waitFor(() => getByText(/no posts/i));

    expect(posts).toHaveLength(postsEmptyMock.length);
    expect(emptyMassage).toBeInTheDocument();
  });

  it("should render posts page with limited posts", async () => {
    const { findByRole, getAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const checkbox = await findByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    setupPostsLimitedHandlers();

    await waitFor(() => {
      userEvent.click(checkbox);

      expect(checkbox).toBeChecked();

      const posts = getAllByTestId("postItem");
      expect(posts).toHaveLength(postsLimitedMock.length);
      expect(posts[0]).toHaveAttribute(
        "href",
        `/post/${postsLimitedMock[0].id}`
      );
    });
  });

  it("should rout to login page without authorization", async () => {
    const { getByText } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const newPostButton = await waitFor(() => getByText(/add new post/i));
    expect(newPostButton).toBeInTheDocument();

    userEvent.click(newPostButton);

    const loginTitle = await waitFor(() => getByText(/login page/i));
    expect(loginTitle).toBeInTheDocument();
  });

  it("should rout to action post page with authorization", async () => {
    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.POSTS}`],
      }
    );

    const newPostButton = await waitFor(() => getByText(/add new post/i));
    expect(newPostButton).toBeInTheDocument();

    userEvent.click(newPostButton);

    const newPostTitle = await waitFor(() => getByText(/new post/i));
    expect(newPostTitle).toBeInTheDocument();
  });

  it("should rout to single post page", async () => {
    setupPostsHandlers();

    const { getAllByTestId, getByText } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => getAllByTestId("postItem"));

    expect(posts).toHaveLength(postsMock.length);

    userEvent.click(posts[0]);

    setupSinglePostHandlers(postsMock[0].id);

    const commentsTitle = await waitFor(() => getByText(/comments/i));
    const postBodyText = await waitFor(() => getByText(postsMock[0].body));

    expect(commentsTitle).toBeInTheDocument();
    expect(postBodyText).toBeInTheDocument();
  });
});
