import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "@/Components/DataTableDropDown.vue";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: () => h("div", { class: "text-center" }, "タイトル"),
        cell: ({ row }) =>
            h("div", { class: "font-medium" }, row.getValue("title")),
    },
    {
        accessorKey: "excerpt",
        header: () => h("div", { class: "text-center" }, "抜粋"),
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
