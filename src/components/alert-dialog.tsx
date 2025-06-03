import {
    type HTMLAttributes,
    type ReactNode,
    type ForwardedRef,
    createContext,
    useContext,
    useState,
    forwardRef,
} from "react";
import { Button, ButtonProps } from "./button";
import { Portal } from "@radix-ui/react-portal";
import { twMerge } from "tailwind-merge";

interface AlertDialogContextProps {
    handleOpen: () => void;
    handleClose: () => void;
    isOpen: boolean;
}

const AlertDialogContext = createContext<AlertDialogContextProps | null>(null);

const useDialogContext = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within an AlertDialogProvider");
    }
    return context;
};

interface AlertDialogTriggerProps extends ButtonProps {}

const AlertDialogTrigger = forwardRef(
    ({ children, ...props }: AlertDialogTriggerProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const { handleOpen } = useDialogContext();
        return (
            <Button onClick={handleOpen} ref={ref} {...props}>
                {children}
            </Button>
        );
    }
);
AlertDialogTrigger.displayName = "AlertDialogTrigger";

interface AlertConfirmProps extends ButtonProps {
    onConfirm?: () => void;
}

const AlertDialogConfirm = forwardRef(
    ({ children, onConfirm, ...props }: AlertConfirmProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const { handleClose } = useDialogContext();
        return (
            <Button
                size="sm"
                onClick={() => {
                    onConfirm?.();
                    handleClose();
                }}
                ref={ref}
                {...props}
            >
                {children}
            </Button>
        );
    }
);
AlertDialogConfirm.displayName = "AlertDialogConfirm";

interface AlertCloseProps extends ButtonProps {}

const AlertDialogClose = forwardRef(
    ({ children, variant, ...props }: AlertCloseProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const { handleClose } = useDialogContext();
        return (
            <Button variant={variant ?? "outline"} size="sm" onClick={handleClose} ref={ref} {...props}>
                {children}
            </Button>
        );
    }
);
AlertDialogClose.displayName = "AlertDialogClose";

interface AlertOptionsProps extends HTMLAttributes<HTMLDivElement> {}

const AlertDialogOptions = forwardRef(
    ({ children, className, ...props }: AlertOptionsProps, ref: ForwardedRef<HTMLDivElement>) => {
        return (
            <div ref={ref} className={twMerge("mt-4 flex justify-end space-x-2", className)} {...props}>
                {children}
            </div>
        );
    }
);
AlertDialogOptions.displayName = "AlertDialogOptions";

interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
const AlertDialogDescription = forwardRef(
    ({ children, className, ...props }: AlertDialogDescriptionProps, ref: ForwardedRef<HTMLParagraphElement>) => {
        return (
            <p ref={ref} className={twMerge("mt-2", className)} {...props}>
                {children}
            </p>
        );
    }
);
AlertDialogDescription.displayName = "AlertDialogDescription";

interface AlertDialogContentProps {
    children: ReactNode;
}
function AlertDialogContent({ children }: AlertDialogContentProps) {
    const { isOpen } = useDialogContext();

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">{children}</div>
            </div>
        </Portal>
    );
}

type AlertDialogProps = {
    children: ReactNode;
    onOpenChange?: (isOpen: boolean) => void;
    isOpen?: boolean;
};

function AlertDialog({ children, onOpenChange, isOpen: _isOpen }: AlertDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const contextValue = {
        handleOpen: () => onOpenChange?.(true) || setIsOpen(true),
        handleClose: () => onOpenChange?.(false) || setIsOpen(false),
        isOpen: _isOpen || isOpen,
    };

    return <AlertDialogContext.Provider value={contextValue}>{children}</AlertDialogContext.Provider>;
}

export {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogClose,
    AlertDialogConfirm,
    AlertDialogOptions,
    AlertDialogDescription,
};
