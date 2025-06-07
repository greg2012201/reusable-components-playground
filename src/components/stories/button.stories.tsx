import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "A versatile button component that supports multiple variants, sizes, and can be rendered as other elements.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "outline", "link"],
            description: "The visual style of the button",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "The size of the button",
        },
        disabled: {
            control: "boolean",
            description: "Whether the button is disabled",
        },
        asChild: {
            control: "boolean",
        },
        children: {
            control: "text",
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Default Button",
        variant: "default",
        size: "md",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline Button",
        variant: "outline",
        size: "md",
    },
};

export const Link: Story = {
    args: {
        children: "Link Button",
        variant: "link",
        size: "md",
    },
};

export const Small: Story = {
    args: {
        children: "Small Button",
        size: "sm",
    },
};

export const Medium: Story = {
    args: {
        children: "Medium Button",
        size: "md",
    },
};

export const Large: Story = {
    args: {
        children: "Large Button",
        size: "lg",
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled Button",
        disabled: true,
    },
};

export const AsChild: Story = {
    args: {
        asChild: true,
        children: <a href="/">Link as Button</a>,
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
                Menu
            </>
        ),
    },
};
