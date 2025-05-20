import {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    type ButtonHTMLAttributes,
    type HTMLAttributes,
    type ReactElement,
} from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const Slot = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
    if (Children.count(children) > 1) {
        throw new Error("Slot can only have one child");
    }
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
    if (!isValidElement(child)) {
        throw new Error("Slot must have a valid child");
    }
    const childProps = child.props;

    return cloneElement(child, {
        ...props,
        ...childProps,
        className: twMerge(props.className, childProps.className),
        ...(ref ? { ref } : {}),
    });
});

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-gray-900 text-white shadow-sm hover:bg-gray-800 focus-visible:ring-gray-500",
                outline:
                    "border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-gray-500",
                link: "text-gray-900 underline-offset-4 hover:underline focus-visible:ring-gray-500",
            },
            size: {
                sm: "px-3 py-1.5 text-sm",
                md: "px-4 py-2 text-sm",
                lg: "px-6 py-3 text-base",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ onClick, children, type = "button", className, variant, size, asChild, ...props }, ref) => {
        const Component = asChild ? Slot : "button";
        return (
            <Component
                ref={ref}
                type={type}
                onClick={onClick}
                className={twMerge(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
