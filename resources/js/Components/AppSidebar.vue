<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/vue3";
import type { Method } from "@inertiajs/core";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import NavLink from "@/Components/NavLink.vue";

const props = defineProps<SidebarProps>();
type Naviitem = {
    navMain: Array<{
        title: string;
        url: string;
        items: Array<{ title: string; url: string; method?: Method }>;
    }>;
};
// This is sample data.
const data: Naviitem = {
    navMain: [
        {
            title: "機能一覧",
            url: "#",
            items: [
                {
                    title: "Profile",
                    url: route("profile.edit"),
                },
                {
                    title: "Psots",
                    url: route("posts.index"),
                },
            ],
        },
        {
            title: "参考機能",
            url: "#",
            items: [
                {
                    title: "PsotsSimple",
                    url: route("postssimple"),
                },
            ],
        },
        {
            title: "アプリケーション終了",
            url: "#",
            items: [
                {
                    title: "Log Out",
                    url: route("logout"),
                    method: "post",
                },
            ],
        },
    ],
};
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <div class="flex">
                <!-- Logo -->
                <div class="flex shrink-0 items-center">
                    <Link :href="route('dashboard')">
                        <ApplicationLogo
                            class="block h-9 w-auto fill-current text-gray-800"
                        />
                    </Link>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <NavLink
                        :href="route('dashboard')"
                        :active="route().current('dashboard')"
                    >
                        Dashboard
                    </NavLink>
                </div>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup v-for="item in data.navMain" :key="item.title">
                <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem
                            v-for="childItem in item.items"
                            :key="childItem.title"
                        >
                            <SidebarMenuButton as-child>
                                <Link
                                    :href="childItem.url"
                                    :method="childItem.method"
                                    >{{ childItem.title }}</Link
                                >
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>{{ $page.props.auth.user.name }}</SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
