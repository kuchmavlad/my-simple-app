import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { authContextStateMock, postsMock } from "tests/moks";
import { renderWithRouterAndProvider } from "tests/utils";
import {
  setupPostDeleteHandlers,
  setupPostEditHandlers,
  setupPostsNewHandlers,
  setupSinglePostHandlers,
} from "tests/mswHandlers";

import "tests/setupTests";

describe("Post Actions Page", () => {
  it("should edit post", async () => {
    const { id: mockPostId, title: mockPostTitle, body } = postsMock[0];
    const { id: userId } = authContextStateMock.user;
    setupSinglePostHandlers(mockPostId);
    setupPostEditHandlers(mockPostId);

    const { getByText, getByPlaceholderText } = renderWithRouterAndProvider(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${userId}/${mockPostId}/edit`],
      }
    );

    const postEditTitle = await waitFor(() => getByText(/edit post/i));
    const titleInput = await waitFor(() => getByPlaceholderText(/title/i));
    const bodyInput = await waitFor(() => getByPlaceholderText(/description/i));
    const saveButton = await waitFor(() => getByText(/save/i));

    expect(postEditTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(titleInput).toHaveValue(mockPostTitle);
    expect(bodyInput).toHaveValue(body);
    expect(titleInput).toBeRequired();
    expect(bodyInput).toBeRequired();

    userEvent.click(saveButton);

    const postPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postPageTitle).toBeInTheDocument();
  });

  it("should create new post", async () => {
    setupPostsNewHandlers();

    const { getByText, getByPlaceholderText } = renderWithRouterAndProvider(
      authContextStateMock,
      undefined,
      {
        initialEntries: ["/post/new"],
      }
    );

    const postNewTitle = getByText(/new post/i);
    const saveButton = getByText(/save/i);
    const titleInput = getByPlaceholderText(/title/i);
    const bodyInput = getByPlaceholderText(/description/i);

    expect(postNewTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(titleInput).toBeEmpty();
    expect(bodyInput).toBeEmpty();
    expect(titleInput).toBeRequired();
    expect(bodyInput).toBeRequired();

    const titleText = "titleText";
    const bodyText = "bodyText";

    userEvent.type(titleInput, "titleText");
    userEvent.type(bodyInput, "bodyText");

    expect(titleInput).toHaveValue(titleText);
    expect(bodyInput).toHaveValue(bodyText);

    userEvent.click(saveButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    expect(postsPageTitle).toBeInTheDocument();
  });

  it("should rout back to posts page", async () => {
    const { getByText } = renderWithRouterAndProvider(
      authContextStateMock,
      undefined,
      {
        initialEntries: ["/posts", "/post/new"],
      }
    );

    const postNewTitle = getByText(/new post/i);
    const cancelButton = getByText(/cancel/i);

    expect(postNewTitle).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));

    screen.debug();
    expect(postsPageTitle).toBeInTheDocument();
  });

  it("shouldn't delete post after cancellation", async () => {
    const { id: mockPostId } = postsMock[0];
    setupSinglePostHandlers(mockPostId);

    const { getByText } = renderWithRouterAndProvider(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(deleteButton).toBeInTheDocument();
    window.confirm = jest.fn(() => false);

    userEvent.click(deleteButton);

    expect(window.confirm).toBeCalledTimes(1);
    expect(deleteButton).toBeInTheDocument();
  });

  it("should delete post after confirmation", async () => {
    const { id: mockPostId } = postsMock[0];
    setupSinglePostHandlers(mockPostId);
    setupPostDeleteHandlers(mockPostId);

    const { getByText } = renderWithRouterAndProvider(
      authContextStateMock,
      undefined,
      {
        initialEntries: [`/post/${mockPostId}`],
      }
    );

    const deleteButton = await waitFor(() => getByText("Delete"));

    expect(deleteButton).toBeInTheDocument();

    window.confirm = jest.fn(() => true);

    userEvent.click(deleteButton);

    expect(window.confirm).toBeCalledTimes(1);

    const postsPageTitle = await waitFor(() => getByText(/posts page/i));
    expect(postsPageTitle).toBeInTheDocument();
  });
});