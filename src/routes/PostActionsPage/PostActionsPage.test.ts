import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { authContextStateMock, postMock, postsMock } from "tests/unit/moks";
import { renderWithRouterAndCustomProviderState } from "tests/unit/utils";
import { PATHS } from "../../constants";
import {
  setupPostDeleteHandlers,
  setupPostEditHandlers,
  setupPostNewHandlers,
  setupPostHandlers,
  setupPostCommentsHandlers,
  setupPostsHandlers,
} from "tests/unit/mswHandlers";

import "tests/unit/setupTests";

describe("Post Actions Page", () => {
  it("should edit post", async () => {
    const {
      id: mockPostId,
      title: mockPostTitle,
      body: mockPostBody,
    } = postMock;
    const { id: userId } = authContextStateMock.user;

    setupPostsHandlers(postsMock);
    setupPostHandlers(mockPostId);
    setupPostEditHandlers(mockPostId);

    const { getByText, getByPlaceholderText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/post/${userId}/${mockPostId}/${PATHS.EDIT}`],
      });

    const postEditTitle = await waitFor(() => getByText(/edit post/i));
    const titleInput = await waitFor(() => getByPlaceholderText(/title/i));
    const bodyInput = await waitFor(() => getByPlaceholderText(/description/i));
    const saveButton = await waitFor(() => getByText(/save/i));

    expect(postEditTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(mockPostTitle);
    expect(bodyInput).toHaveValue(mockPostBody);
    expect(titleInput).toBeRequired();
    expect(bodyInput).toBeRequired();

    userEvent.click(saveButton);

    const postPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postPageTitle).toBeInTheDocument();
  });

  it("should create new post", async () => {
    setupPostsHandlers();
    setupPostNewHandlers();

    const { getByText, getByPlaceholderText } =
      renderWithRouterAndCustomProviderState(authContextStateMock, undefined, {
        initialEntries: [`/${PATHS.POST_NEW}`],
      });

    const postNewTitle = getByText(/new post/i);
    const saveButton = getByText(/save/i);
    const titleInput = getByPlaceholderText(/title/i);
    const bodyInput = getByPlaceholderText(/description/i);
    const titleText = "titleText";
    const bodyText = "bodyText";

    expect(postNewTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(titleInput).toBeEmptyDOMElement();
    expect(bodyInput).toBeEmptyDOMElement();
    expect(titleInput).toBeRequired();
    expect(bodyInput).toBeRequired();

    userEvent.type(titleInput, titleText);
    userEvent.type(bodyInput, bodyText);

    expect(titleInput).toHaveValue(titleText);
    expect(bodyInput).toHaveValue(bodyText);

    userEvent.click(saveButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsPageTitle).toBeInTheDocument();
  });

  it("should rout back to posts page", async () => {
    setupPostsHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/${PATHS.POSTS}`, `/${PATHS.POST_NEW}`],
      }
    );

    const postNewTitle = getByText(/new post/i);
    const cancelButton = getByText(/cancel/i);

    expect(postNewTitle).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsPageTitle).toBeInTheDocument();
  });

  it("shouldn't delete post after cancellation", async () => {
    const { id: mockPostId } = postMock;

    setupPostHandlers(mockPostId);
    setupPostsHandlers();
    setupPostCommentsHandlers();

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    window.confirm = jest.fn(() => false);
    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(window.confirm).toBeCalledTimes(1);
    expect(deleteButton).toBeInTheDocument();
  });

  it("should delete post after confirmation", async () => {
    const { id: mockPostId } = postMock;

    setupPostHandlers(mockPostId);
    setupPostsHandlers();
    setupPostCommentsHandlers();
    setupPostDeleteHandlers(mockPostId);

    const { getByText } = renderWithRouterAndCustomProviderState(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    window.confirm = jest.fn(() => true);
    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(window.confirm).toBeCalledTimes(1);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));
    expect(postsPageTitle).toBeInTheDocument();
  });
});
