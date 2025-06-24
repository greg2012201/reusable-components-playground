import { describe, expect, it, test, vi } from "vitest";
import { fireEvent, readFileContent, render, screen } from "../../test/test-utils";
import { Button } from "../button";

describe("Button", () => {
    it("functions as a file input", async () => {
        const mockFile = new File(["Hello, World!\nThis is test content."], "test.txt", {
            type: "text/plain",
            lastModified: Date.now(),
        });

        const handleChange = vi.fn();

        render(
            <Button asChild>
                <input type="file" onChange={handleChange} accept="image/*" data-testid="file-input" />
            </Button>
        );

        const fileInput = screen.getByTestId("file-input");
        expect(fileInput.tagName).toBe("INPUT");
        expect(fileInput).toHaveAttribute("type", "file");
        expect(fileInput).toHaveAttribute("accept", "image/*");

        fireEvent.change(fileInput, {
            target: { files: [mockFile] },
        });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);

        const uploadedFile = (fileInput as HTMLInputElement).files?.[0];

        const content = await readFileContent(uploadedFile!);
        expect(content).toBe("Hello, World!\nThis is test content.");
    });
});
