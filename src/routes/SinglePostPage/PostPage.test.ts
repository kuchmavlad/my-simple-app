import "@testing-library/jest-dom";
import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  renderWithRouter,
  renderWithRouterAndCustomProviderState,
} from "tests/utils";
import { authContextStateMock, commentsMock, postsMock } from "tests/moks";
import {
  setupPostCommentsHandlers,
  setupPostHandlers,
} from "tests/mswHandlers";

import "tests/setupTests";

describe("Single post page", () => {
  it("should render single post page with comments", async () => {
    const { id: mockPostId, title: mockPostTitle } = postsMock[0];
    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers();

    const { getByText, queryAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/post/${mockPostId}`],
    });

    const postTitle = await waitFor(() => getByText(mockPostTitle));
    const comments = await waitFor(() => queryAllByTestId("commentItem"));

    expect(postTitle).toBeInTheDocument();
    expect(comments).toHaveLength(commentsMock.length);

    screen.debug();
  });

  it("should render single post page without comments", async () => {
    const { id: mockPostId, title: mockPostTitle } = postsMock[0];
    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers([]);

    const { getByText, queryAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/post/${mockPostId}`],
    });

    const postTitle = await waitFor(() => getByText(mockPostTitle));
    const emptyCommentsText = await waitFor(() => getByText(/no comments/i));
    const comments = await waitFor(() => queryAllByTestId("commentItem"));

    expect(postTitle).toBeInTheDocument();
    expect(emptyCommentsText).toBeInTheDocument();
    expect(comments).toHaveLength(0);
  });

  it("should have edit/delete button", async () => {
    const { id: mockPostId, title: mockPostTitle } = postsMock[0];
    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    const postTitle = await waitFor(() => getByText(mockPostTitle));
    const editButton = await waitFor(() => getByText("Edit"));
    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(postTitle).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should rout to edit post page", async () => {
    const { id: mockPostId } = postsMock[0];
    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    const editButton = await waitFor(() => getByText("Edit"));

    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);

    const editPostTitle = await waitFor(() => getByText(/edit post/i));

    expect(editPostTitle).toBeInTheDocument();
  });
});
