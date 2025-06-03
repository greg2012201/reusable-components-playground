import "./app.css";
import { Button } from "./components/button";
import { useEffect, useRef, useState } from "react";
import {
    AlertDialogClose,
    AlertDialogConfirm,
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogOptions,
} from "./components/alert-dialog";
import Link from "./components/link";

function App() {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log("Button ref:", buttonRef.current);
    }, []);
    return (
        <div className="flex flex-col space-y-4 items-center justify-center h-screen">
            <h1>Reusable components playground</h1>
            <div className="space-x-4">
                <Button variant="outline" size="lg" onClick={() => setIsOpen(true)}>
                    Click me
                </Button>
                <Button ref={buttonRef} asChild variant="link">
                    <Link
                        href="https://www.aboutjs.dev"
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Give me to the awesome blog
                    </Link>
                </Button>
                <AlertDialog onOpenChange={setIsOpen} isOpen={isOpen}>
                    {/* <AlertDialog onOpenChange={setIsOpen} isOpen={isOpen}> */}
                    <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogDescription>Hello! I am a little alert</AlertDialogDescription>
                        <AlertDialogOptions>
                            <AlertDialogClose>Close</AlertDialogClose>
                            <AlertDialogConfirm>Confirm</AlertDialogConfirm>
                        </AlertDialogOptions>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default App;
