import { render, fireEvent, act } from "@testing-library/react-native";
import CreateProjectForm from "./project-form";
import { ThemeProvider } from "@shopify/restyle";
import Theme from "@/theme";

import { ERROR_MESSAGES } from "../constants/error-messages";
const mockOnSubmit = jest.fn((data) => {});

// Wrap the component in a theme provider to test with the theme
const ThemedCreateProjectForm = () => (
  <ThemeProvider theme={Theme}>
    <CreateProjectForm onSubmit={mockOnSubmit} />
  </ThemeProvider>
);

describe("CreateProjectForm", () => {
  it("should display required errors when submit pressed with undefined values", async () => {
    const { getByTestId, getByText } = render(<ThemedCreateProjectForm />);

    await act(async () => {
      fireEvent.press(getByTestId("submitButton"));
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();

    const nameError = getByText(ERROR_MESSAGES.REQUIRED_NAME);
    const descriptionError = getByText(ERROR_MESSAGES.REQUIRED_DESCRIPTION);
    expect(nameError).toBeDefined();
    expect(descriptionError).toBeDefined();
  });
  it("should submit form when form values are valid", async () => {
    const { getByTestId, queryByText } = render(<ThemedCreateProjectForm />);

    fireEvent.changeText(getByTestId("nameInput"), "Project 1");
    fireEvent.changeText(
      getByTestId("descriptionInput"),
      "Project 1 description"
    );

    await act(async () => {
      fireEvent.press(getByTestId("submitButton"));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        name: "Project 1",
        description: "Project 1 description",
      },
      undefined
    );

    const nameError = queryByText(ERROR_MESSAGES.REQUIRED_NAME);
    const descriptionError = queryByText(ERROR_MESSAGES.REQUIRED_DESCRIPTION);
    expect(nameError).toBeNull();
    expect(descriptionError).toBeNull();
  });
});
