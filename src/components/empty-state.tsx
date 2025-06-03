import { Inbox } from "lucide-react";

export function EmptyState() {
    return (
        <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Inbox className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
                <p className="text-gray-500 text-sm max-w-sm">Your list is empty</p>
            </div>
        </div>
    );
}
