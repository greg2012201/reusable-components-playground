import { useState } from "react";
import { ListItem } from "./list-item";
import { list } from "postcss";
import { EmptyState } from "./empty-state";

type Item = {
    id: number;
    title: string;
    description: string;
};

interface ListExampleProps {
    items?: Item[];
}

export function ListExample({ items }: ListExampleProps) {
    const [itemsData, setItems] = useState<Item[]>(items ?? []);

    const handleDelete = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    if (itemsData.length === 0) {
        return <EmptyState />;
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Project List</h2>
            <div className="space-y-4">
                {itemsData.map((item) => (
                    <ListItem
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        onDelete={() => handleDelete(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}
