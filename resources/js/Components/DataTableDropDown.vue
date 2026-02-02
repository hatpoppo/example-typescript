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
import Edit from "@/Components/Posts/Edit.vue";
import { useTemplateRef } from "vue";
const props = defineProps<{
    post: Post;
}>();

const editPostRef = useTemplateRef("editPost");
function openSheet() {
    editPostRef.value.openSheet();
}
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
    <Edit :post="post" ref="editPost" />
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem @click="copy(post.id)">
                Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="openSheet()">編集</DropdownMenuItem>
            <DropdownMenuItem
                ><Link
                    :href="route('posts.destroy', post.id)"
                    class="w-full text-left"
                    method="delete"
                    :onBefore="destroy"
                    >削除</Link
                ></DropdownMenuItem
            >
        </DropdownMenuContent>
    </DropdownMenu>
</template>
