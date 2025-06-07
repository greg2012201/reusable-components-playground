import { describe, expect, it } from "vitest";
import { render } from "../../test/test-utils";
import { ListExample } from "../list-example";
import { fireEvent } from "@testing-library/react";
import { ITEMS } from "../../const/listData";

describe("ListExample", () => {
    it("opens alert dialog when delete button is clicked", async () => {
        const { getByRole, getByText } = render(<ListExample items={[ITEMS[0]]} />);

        // Find and click the delete button for the first item
        const deleteButton = getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        // Check if alert dialog is shown
        expect(getByText(/are you sure/i)).toBeInTheDocument();
    });

    it("keeps the item when clicking 'No thanks' in alert dialog", async () => {
        const { getByRole, getByText } = render(
            <ListExample items={[{ id: 1, title: "Test Project", description: "This is a test project." }]} />
        );

        // Click delete on first item
        const deleteButton = getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        // Find and click "No thanks" button
        const cancelButton = getByRole("button", { name: /no thanks/i });
        fireEvent.click(cancelButton);

        // Verify item still exists
        expect(getByText("Test Project")).toBeInTheDocument();
    });

    it("deletes the item when confirming in alert dialog", async () => {
        const { getByRole, queryByText, getByText, getByTestId } = render(
            <ListExample
                items={[
                    { id: 1, title: "Test Project", description: "This is a test project." },
                    { id: 2, title: "Another Project", description: "This is another project." },
                ]}
            />
        );

        // Initial check
        expect(queryByText("Test Project")).toBeInTheDocument();
        expect(queryByText("Another Project")).toBeInTheDocument();

        // Find the Test Project item and click its delete button
        const deleteButton = getByTestId(`delete-button-1`);
        if (!deleteButton) throw new Error("Delete button not found");
        fireEvent.click(deleteButton);

        // Find and click confirm button
        const confirmButton = getByRole("button", { name: /confirm/i });
        fireEvent.click(confirmButton);

        // Verify item was deleted
        expect(queryByText("Test Project")).not.toBeInTheDocument();
        expect(queryByText("Another Project")).toBeInTheDocument();
    });

    it("renders empty state when no items are present", () => {
        const { getByText } = render(<ListExample items={[]} />);

        // Check if empty state is rendered
        expect(getByText("No items found")).toBeInTheDocument();
        expect(getByText("Your list is empty")).toBeInTheDocument();
    });

    it("renders empty state after deleting all items", async () => {
        const { getByRole, getByText } = render(<ListExample items={[ITEMS[0]]} />);

        // Delete the only item
        const deleteButton = getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        const confirmButton = getByRole("button", { name: /confirm/i });
        fireEvent.click(confirmButton);

        // Check if empty state is rendered
        expect(getByText("No items found")).toBeInTheDocument();
        expect(getByText("Your list is empty")).toBeInTheDocument();
    });
});
