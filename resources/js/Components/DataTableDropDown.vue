<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { Link } from "@inertiajs/vue3";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

defineProps<{
    data: {
        id: number;
    };
}>();

function copy(id: number) {
    navigator.clipboard.writeText(id.toString());
}
function destroy() {
    if (confirm("Are you sure?")) {
        return true;
    } else {
        return false;
    }
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem @click="copy(data.id)">
                <span class="w-full text-center">Copy ID</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                ><Link
                    :href="route('posts.edit', data.id)"
                    class="w-full text-center"
                    >編集</Link
                ></DropdownMenuItem
            >
            <DropdownMenuItem
                ><Link
                    :href="route('posts.destroy', data.id)"
                    class="w-full"
                    method="delete"
                    :onBefore="destroy"
                    >削除</Link
                ></DropdownMenuItem
            >
        </DropdownMenuContent>
    </DropdownMenu>
</template>
