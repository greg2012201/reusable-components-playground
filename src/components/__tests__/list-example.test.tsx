import { describe, expect, it } from "vitest";
import { render } from "../../test/test-utils";
import { ListExample } from "../list-example";
import { fireEvent } from "@testing-library/react";
import { ITEMS } from "../../const/listData";

describe("ListExample", () => {
    it("keeps the item when clicking 'No thanks' in alert dialog", async () => {
        const { getByRole, getByText } = render(
            <ListExample items={[{ id: 1, title: "Test Project", description: "This is a test project." }]} />
        );

        const deleteButton = getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        const cancelButton = getByRole("button", { name: /no thanks/i });
        fireEvent.click(cancelButton);

        expect(getByText("Test Project")).toBeInTheDocument();
    });

    it("deletes the item when confirming in alert dialog", async () => {
        const { getByRole, queryByText, getByTestId } = render(
            <ListExample
                items={[
                    { id: 1, title: "Test Project", description: "This is a test project." },
                    { id: 2, title: "Another Project", description: "This is another project." },
                ]}
            />
        );

        expect(queryByText("Test Project")).toBeInTheDocument();
        expect(queryByText("Another Project")).toBeInTheDocument();

        const deleteButton = getByTestId(`delete-button-1`);
        if (!deleteButton) throw new Error("Delete button not found");
        fireEvent.click(deleteButton);

        const confirmButton = getByRole("button", { name: /confirm/i });
        fireEvent.click(confirmButton);

        expect(queryByText("Test Project")).not.toBeInTheDocument();
        expect(queryByText("Another Project")).toBeInTheDocument();
    });

    it("renders empty state after deleting all items", async () => {
        const { getByRole, getByText } = render(<ListExample items={[ITEMS[0]]} />);

        const deleteButton = getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        const confirmButton = getByRole("button", { name: /confirm/i });
        fireEvent.click(confirmButton);

        expect(getByText("No items found")).toBeInTheDocument();
        expect(getByText("Your list is empty")).toBeInTheDocument();
    });
});
