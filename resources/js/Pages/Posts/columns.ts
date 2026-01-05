import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: () => h("div", { class: "text-center" }, "タイトル"),
        cell: ({ row }) =>
            h("div", { class: " font-medium" }, row.getValue("title")),
    },
    {
        accessorKey: "excerpt",
        header: () => h("div", { class: "text-center" }, "抜粋"),
        cell: ({ row }) =>
            h("div", { class: " font-medium" }, row.getValue("excerpt")),
    },
];
