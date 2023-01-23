import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "tests/utils";

describe("Error page", () => {
  it("should render error page", () => {
    const { getByText } = renderWithRouter(undefined, {
      initialEntries: ["/error"],
    });
    const errorPageTitle = getByText(/oops!/i);

    expect(errorPageTitle).toBeInTheDocument();
  });

  it("should redirect to home page", () => {
    const { getByText } = renderWithRouter(undefined, {
      initialEntries: ["/error"],
    });
    const button = getByText(/home/i);

    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const homePageTitle = getByText(/my simple app/i);

    expect(homePageTitle).toBeInTheDocument();
  });
});
