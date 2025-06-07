import type { Meta, StoryObj } from "@storybook/react";
import { ListExample } from "../list-example";
import { ITEMS } from "../../const/listData";
import { screen, expect, waitFor } from "storybook/test";

const meta = {
    title: "Components/ListExample",
    component: ListExample,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A list component that displays items with titles and descriptions. Supports empty state and item deletion.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        items: {
            control: "object",
            description: "Array of items to display in the list",
        },
    },
} satisfies Meta<typeof ListExample>;

export default meta;
type Story = StoryObj<typeof ListExample>;

export const Default: Story = {
    args: {
        items: ITEMS,
    },
};

export const EmptyList: Story = {
    args: {
        items: [],
    },
};

export const SingleItem: Story = {
    args: {
        items: [ITEMS[0]],
    },
};

export const LongList: Story = {
    args: {
        items: [
            ...ITEMS,
            {
                id: 4,
                title: "E-commerce Platform",
                description: "Modern e-commerce solution with integrated payment processing and inventory management.",
            },
            {
                id: 5,
                title: "Analytics Dashboard",
                description: "Real-time analytics dashboard with interactive charts and customizable metrics.",
            },
            {
                id: 6,
                title: "API Integration",
                description: "Integration with third-party APIs for enhanced functionality and data synchronization.",
            },
        ],
    },
};

const ClickOnDelete: Story = {
    play: async ({ canvas, userEvent }) => {
        const deleteButton = canvas.getAllByRole("button", { name: /delete/i })[0];
        await userEvent.click(deleteButton);
    },
};
const ClickOnConfirm: Story = {
    play: async ({ userEvent }) => {
        const confirmButton = screen.getByText("Confirm");
        await userEvent.click(confirmButton);
    },
};

const ClickOnReject: Story = {
    play: async ({ userEvent }) => {
        const rejectButton = screen.getByText(/no thanks/i);
        await userEvent.click(rejectButton);
    },
};

export const WithDeleteInteraction: Story = {
    args: {
        items: ITEMS,
    },
    play: async ({ context, canvas, step }) => {
        await step("Render List", async () => {
            await expect(canvas.getByText("Project Alpha")).toBeInTheDocument();
        });

        await step("Delete first item", async () => {
            await ClickOnDelete.play(context);
        });

        await step("Confirm deletion", async () => {
            await ClickOnConfirm.play(context);
        });

        await step("Verify deletion", async () => {
            await waitFor(() => {
                expect(canvas.queryByText("Project Alpha")).not.toBeInTheDocument();
            });
        });
    },
};
export const WithRejectedDeletionOperation: Story = {
    args: {
        items: ITEMS,
    },
    play: async ({ context, canvas, step }) => {
        await step("Render List", async () => {
            await expect(canvas.getByText("Project Alpha")).toBeInTheDocument();
        });

        await step("Delete first item", async () => {
            await ClickOnDelete.play(context);
        });

        await step("Reject", async () => {
            await ClickOnReject.play(context);
        });

        await step("Verify deletion", async () => {
            await waitFor(() => {
                expect(canvas.queryByText("Project Alpha")).toBeInTheDocument();
            });
        });
    },
};

export const WithDeleteLastItem: Story = {
    args: {
        items: [ITEMS[0]],
    },
    play: async ({ context, canvas, step, userEvent }) => {
        await step("Render List", async () => {
            await expect(canvas.getByText("Project Alpha")).toBeInTheDocument();
        });
        await step("Delete first item", async () => {
            await ClickOnDelete?.play(context);
        });

        await step("Confirm deletion", async () => {
            await ClickOnConfirm.play(context);
        });

        await step("Verify empty state", async () => {
            await waitFor(() => {
                expect(canvas.getByText("No items found")).toBeInTheDocument();
                expect(canvas.getByText("Your list is empty")).toBeInTheDocument();
            });
        });
    },
};
