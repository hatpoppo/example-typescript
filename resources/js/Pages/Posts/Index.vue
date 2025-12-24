<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
const props = defineProps<{ posts: paginate<Array<Post>> }>();
</script>

<template>
    <Head title="Posts" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Posts
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <div
                        v-for="post in props.posts.data"
                        :key="post.id"
                        class="flex items-center shadow-md bg-white rounded-xl p-4 mb-4"
                    >
                        <div
                            class="flex flex-col text-left justify-between pl-3 space-y-5"
                        >
                            <h3
                                class="text-xl font-semibold text-indigo-600 focus:text-indigo-800"
                            >
                                <Link :href="route('posts.show', post.id)">{{
                                    post.title
                                }}</Link>
                            </h3>
                            <p>{{ post.excerpt }}</p>
                        </div>
                    </div>
                    <Pagination
                        v-slot="{ page }"
                        :items-per-page="props.posts.per_page"
                        :total="props.posts.total"
                        :page="props.posts.current_page"
                    >
                        <PaginationContent v-slot="{ items }">
                            <Link
                                :href="
                                    props.posts.prev_page_url
                                        ? props.posts.prev_page_url
                                        : undefined
                                "
                            >
                                <PaginationPrevious />
                            </Link>
                            <template
                                v-for="(item, index) in items"
                                :key="index"
                            >
                                <PaginationItem
                                    v-if="item.type === 'page'"
                                    :value="item.value"
                                    :is-active="item.value === page"
                                >
                                    <Link
                                        :href="
                                            props.posts.links.find(
                                                (element) =>
                                                    element.page === item.value
                                            ).url
                                        "
                                        >{{ item.value }}</Link
                                    >
                                </PaginationItem>
                            </template>

                            <PaginationEllipsis :index="4" />
                            <Link
                                :href="
                                    props.posts.next_page_url
                                        ? props.posts.next_page_url
                                        : undefined
                                "
                            >
                                <PaginationNext />
                            </Link>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
