<script setup lang="ts">
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/Components/AppSidebar.vue";
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <!-- Page Heading -->
            <header class="flex bg-white shadow" v-if="$slots.header">
                <SidebarTrigger />
                <div class="flex-1 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>
            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>
