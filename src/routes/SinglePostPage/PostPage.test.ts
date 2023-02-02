import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  authContextStateMock,
  commentsMock,
  emptyDataMock,
  postMock,
} from "tests/unit/moks";
import {
  renderWithRouter,
  renderWithRouterAndCustomProviderState,
} from "tests/unit/utils";
import {
  setupPostCommentsHandlers,
  setupPostHandlers,
} from "tests/unit/mswHandlers";

import "tests/unit/setupTests";

describe("Single post page", () => {
  it("should render single post page with comments", async () => {
    const { id: mockPostId, title: mockPostTitle } = postMock;

    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers();

    const { getByText, queryAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/post/${mockPostId}`],
    });

    const postTitle = await waitFor(() => getByText(mockPostTitle));
    const comments = await waitFor(() => queryAllByTestId("commentItem"));

    expect(postTitle).toBeInTheDocument();
    expect(comments).toHaveLength(commentsMock.length);
  });

  it("should render single post page without comments", async () => {
    const { id: mockPostId, title: mockPostTitle } = postMock;

    setupPostHandlers(mockPostId);
    setupPostCommentsHandlers(emptyDataMock);

    const { getByText, queryAllByTestId } = renderWithRouter(undefined, {
      initialEntries: [`/post/${mockPostId}`],
    });

    const postTitle = await waitFor(() => getByText(mockPostTitle));
    const emptyCommentsText = await waitFor(() => getByText(/no comments/i));
    const comments = await waitFor(() => queryAllByTestId("commentItem"));

    expect(postTitle).toBeInTheDocument();
    expect(emptyCommentsText).toBeInTheDocument();
    expect(comments).toHaveLength(emptyDataMock.length);
  });

  it("should have edit/delete button", async () => {
    const { id: mockPostId, title: mockPostTitle } = postMock;

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
    const { id: mockPostId } = postMock;

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
