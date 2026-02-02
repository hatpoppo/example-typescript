<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { columns } from "./columns";
import DataTable from "@/Components/DataTable.vue";
import Edit from "@/Components/Posts/Edit.vue";
import { useTemplateRef } from "vue";
import { Button } from "@/components/ui/button";

const editPostRef = useTemplateRef("editPost");
function openSheet() {
    editPostRef.value.openSheet();
}
const props = defineProps<{ posts: Array<Post> }>();
</script>

<template>
    <Head title="Posts" />

    <AuthenticatedLayout>
        <Edit :post="null" ref="editPost" />
        <template #header>
            <div class="flex">
                <h2
                    class="flex-1 text-xl font-semibold leading-tight text-gray-800"
                >
                    Posts
                </h2>
                <Button @click="openSheet()">新規登録</Button>
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <DataTable :columns="columns" :data="props.posts" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
