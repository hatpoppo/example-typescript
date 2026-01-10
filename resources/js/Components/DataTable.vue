<script setup lang="ts" generic="TData, TValue">
import { h, ref } from "vue";
import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/vue-table";
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/vue-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { valueUpdater } from "@/lib/utils";
const props = defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}>();
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});

const table = useVueTable({
    get data() {
        return props.data;
    },
    get columns() {
        return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, columnVisibility),

    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
    },
});
</script>

<template>
    <div class="flex items-center py-4">
        <Input
            class="max-w-sm"
            placeholder="Filter titles..."
            :model-value="table.getColumn('title')?.getFilterValue() as string"
            @update:model-value="
                table.getColumn('title')?.setFilterValue($event)
            "
        />
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" class="ml-auto">
                    Columns
                    <ChevronDown class="w-4 h-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                    v-for="column in table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())"
                    :key="column.id"
                    class="capitalize"
                    :modelValue="column.getIsVisible()"
                    @update:modelValue="
                        (value) => {
                            column.toggleVisibility(!!value);
                        }
                    "
                >
                    {{ column.id }}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow
                    v-for="headerGroup in table.getHeaderGroups()"
                    :key="headerGroup.id"
                >
                    <TableHead
                        v-for="header in headerGroup.headers"
                        :key="header.id"
                    >
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                        :data-state="
                            row.getIsSelected() ? 'selected' : undefined
                        "
                    >
                        <TableCell
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                        >
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell
                            :colspan="columns.length"
                            class="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
    <div class="flex my-2">
        <Button
            @click="() => table.firstPage()"
            :disabled="!table.getCanPreviousPage()"
            >最初へ</Button
        >
        <Button
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
            class="mx-4"
            >前へ</Button
        >
        <Button
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
            class="mx-4"
            >次へ</Button
        >
        <Button
            @click="() => table.lastPage()"
            :disabled="!table.getCanNextPage()"
            >最後へ</Button
        >
    </div>
</template>
