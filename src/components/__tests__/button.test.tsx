import { describe, expect, it } from "vitest";
import { render, screen } from "../../test/test-utils";
import { Button } from "../button";

describe("Button", () => {
    it("renders as child component when asChild is true", () => {
        render(
            <Button asChild>
                <a href="/">Link Button</a>
            </Button>
        );
        const link = screen.getByText("Link Button");
        expect(link.tagName).toBe("A");
        expect(link).toHaveAttribute("href", "/");
    });
    it("renders with default variant", () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText("Click me");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-gray-900");
    });

    it("renders with outline variant", () => {
        render(<Button variant="outline">Click me</Button>);
        const button = screen.getByText("Click me");
        expect(button).toHaveClass("border-2");
    });

    it("renders with different sizes", () => {
        render(<Button size="lg">Large Button</Button>);
        const button = screen.getByText("Large Button");
        expect(button).toHaveClass("px-6 py-3 text-base");
    });
});
