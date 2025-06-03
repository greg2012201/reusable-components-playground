import "./app.css";
import { useEffect, useRef } from "react";
import { ITEMS } from "./const/listData";
import { ListExample } from "./components/list-example";

function App() {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        console.log("Button ref:", buttonRef.current);
    }, []);
    return (
        <div className="flex flex-col space-y-4 items-center justify-center h-screen">
            <h1>Reusable components playground</h1>
            <div className="space-x-4">
                <ListExample items={ITEMS} />
            </div>
        </div>
    );
}

export default App;
