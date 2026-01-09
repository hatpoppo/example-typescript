import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-vue-next";
import DropdownAction from "@/Components/DataTableDropDown.vue";
import { Button } from "@/components/ui/button";

const displaySortIcon = (sotrted: string | boolean) => {
    if (sotrted === "asc") {
        return h(ArrowUp, { class: "ml-2 h-4 w-4" });
    } else if (sotrted === "desc") {
        return h(ArrowDown, { class: "ml-2 h-4 w-4" });
    } else {
        return h(ArrowUpDown, { class: "ml-2 h-4 w-4" });
    }
};

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () =>
                        column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["タイトル", displaySortIcon(column.getIsSorted())]
            );
        },
        cell: ({ row }) =>
            h("div", { class: "font-medium" }, row.getValue("title")),
    },
    {
        accessorKey: "excerpt",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () =>
                        column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["抜粋", displaySortIcon(column.getIsSorted())]
            );
        },
        cell: ({ row }) =>
            h("div", { class: "font-medium" }, row.getValue("excerpt")),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const data = row.original;
            return h("div", { class: "relative" }, h(DropdownAction, { data }));
        },
    },
];
