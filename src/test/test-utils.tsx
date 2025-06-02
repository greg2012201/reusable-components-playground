import { render } from "@testing-library/react";
import { type ReactElement } from "react";

function customRender(ui: ReactElement, options = {}) {
    return render(ui, {
        // wrap provider if needed
        wrapper: ({ children }) => children,
        ...options,
    });
}

export * from "@testing-library/react";
export { customRender as render };
