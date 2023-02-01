import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PATHS } from "../../constants";
import {
  renderWithRouter,
  renderWithRouterAndCustomProviderState,
} from "tests/utils";
import {
  authContextStateMock,
  emptyDataMock,
  postMock,
  postsLimitedMock,
  postsMock,
} from "tests/moks";
import {
  setupPostsHandlers,
  setupPostHandlers,
  setupPostCommentsHandlers,
} from "tests/mswHandlers";

import "tests/setupTests";

describe("Posts page", () => {
  it("should render posts page with posts", async () => {
    const { id: mockPostId, title: mockPostTitle } = postMock;

    setupPostsHandlers();

    const { getAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => getAllByTestId("postItem"));
    const [firstPost] = posts;

    expect(posts).toHaveLength(postsMock.length);
    expect(firstPost).toHaveTextContent(mockPostTitle);
    expect(firstPost).toHaveAttribute("href", `/post/${mockPostId}`);
  });

  it("should render posts page without posts", async () => {
    setupPostsHandlers(emptyDataMock);

    const { queryAllByTestId, getByText } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => queryAllByTestId("postItem"));
    const emptyMassage = await waitFor(() => getByText(/no posts/i));

    expect(posts).toHaveLength(emptyDataMock.length);
    expect(emptyMassage).toBeInTheDocument();
  });

  it("should render posts page with limited posts", async () => {
    setupPostsHandlers();

    const { findByRole, getAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const checkbox = await findByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await waitFor(() => {
      userEvent.click(checkbox);

      expect(checkbox).toBeChecked();

      const posts = getAllByTestId("postItem");
      const [firstPost] = posts;

      expect(posts).toHaveLength(postsLimitedMock.length);
      expect(firstPost).toHaveAttribute(
        "href",
        `/post/${postsLimitedMock[0].id}`
      );
    });
  });

  it("should rout to login page without authorization", async () => {
    setupPostsHandlers();

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
    setupPostsHandlers();

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
    const {
      id: mockPostId,
      title: mockPostTitle,
      body: mockPostBody,
    } = postMock;

    setupPostsHandlers();
    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers();

    const { getAllByTestId, getByText } = renderWithRouter(undefined, {
      initialEntries: [`/${PATHS.POSTS}`],
    });

    const posts = await waitFor(() => getAllByTestId("postItem"));
    const [firstPost] = posts;

    expect(posts).toHaveLength(postsMock.length);

    userEvent.click(firstPost);

    const commentsTitle = await waitFor(() => getByText(/comments/i));
    const postBodyText = await waitFor(() => getByText(mockPostBody));
    const postTitleText = await waitFor(() => getByText(mockPostTitle));

    expect(commentsTitle).toBeInTheDocument();
    expect(postBodyText).toBeInTheDocument();
    expect(postTitleText).toBeInTheDocument();
  });
});
