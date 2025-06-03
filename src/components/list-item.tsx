import { Plus, Trash2 } from "lucide-react";
import { Button } from "./button";
import {
    AlertDialogClose,
    AlertDialogConfirm,
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogOptions,
} from "./alert-dialog";
import { type ReactNode } from "react";

interface ListItemProps {
    title: string;
    description: string;
    onDelete?: () => void;
}

function Header({ children }: { children: ReactNode }) {
    return <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 truncate">{children}</h3>;
}

function Description({ children }: { children: ReactNode }) {
    return <p className="text-gray-600 text-sm leading-relaxed">{children}</p>;
}

export function ListItem({ title, description, onDelete }: ListItemProps) {
    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <Header>{title}</Header>
                        <Description>{description}</Description>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Button disabled>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this item?
                                </AlertDialogDescription>
                                <AlertDialogOptions>
                                    <AlertDialogConfirm onClick={onDelete}>Confirm</AlertDialogConfirm>
                                    <AlertDialogClose>No thanks!</AlertDialogClose>
                                </AlertDialogOptions>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
