import { render } from "@testing-library/react";
import { type ReactElement } from "react";

function readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => resolve(e.target?.result as string);
        reader.onerror = (e: ProgressEvent<FileReader>) => reject(e);
        reader.readAsText(file);
    });
}

function customRender(ui: ReactElement, options = {}) {
    return render(ui, {
        wrapper: ({ children }) => children,
        ...options,
    });
}

export * from "@testing-library/react";
export { customRender as render };
export { readFileContent };
