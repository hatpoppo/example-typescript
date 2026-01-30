<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { Link, useForm, usePage } from "@inertiajs/vue3";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useTemplateRef } from "vue";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm as useValidateForm } from "vee-validate";
import * as z from "zod";
const props = defineProps<{
    post: Post;
}>();

const page = usePage();
const form = useForm({
    title: "",
    excerpt: "",
    body: "",
    user_id: props.post ? props.post.user_id : page.props.auth.user.id,
});

const formSchema = toTypedSchema(
    z.object({
        title: z.string().min(1, { message: "必須です" }),
        excerpt: z.string().min(1, { message: "必須です" }).max(160, {
            message: "１６０文字以内です",
        }),
        body: z.string().min(1, { message: "必須です" }),
    }),
);

const { handleSubmit, resetForm, values } = useValidateForm({
    validationSchema: formSchema,
    initialValues: {
        title: props.post ? props.post.title : "",
        excerpt: props.post ? props.post.excerpt : "",
        body: props.post ? props.post.body : "",
    },
});
const onSubmit = handleSubmit((values) => {
    Object.assign(form, values);
    props.post
        ? form.patch(route("posts.update", props.post.id))
        : form.post(route("posts.store"));
});
const sheetbuttonRef = useTemplateRef("sheetbutton");
function openSheet() {
    resetForm({
        values: {
            title: props.post ? props.post.title : "",
            excerpt: props.post ? props.post.excerpt : "",
            body: props.post ? props.post.body : "",
        },
    });
    const attrs = <{ onClick: () => {} }>sheetbuttonRef.value.$attrs;
    attrs.onClick();
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
    <Sheet>
        <SheetTrigger as-child>
            <Button variant="outline" ref="sheetbutton" class="hidden">
                Open
            </Button>
        </SheetTrigger>
        <SheetContent>
            <form @submit="onSubmit" class="mt-6 space-y-6">
                <SheetHeader>
                    <SheetTitle>Edit Post</SheetTitle>
                    <SheetDescription>
                        Make changes to your post here. Click save when you're
                        done.
                    </SheetDescription>
                </SheetHeader>
                <FormField v-slot="{ componentField }" name="title">
                    <FormItem>
                        <FormLabel>タイトル</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="タイトル"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormDescription>
                            タイトルを入力してください
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="excerpt">
                    <FormItem>
                        <FormLabel>抜粋</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="抜粋"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormDescription>
                            抜粋を入力してください
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="body">
                    <FormItem>
                        <FormLabel>本文</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="本文"
                                class="w-full"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormDescription>
                            本文を入力してください
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <div class="flex items-center gap-4"></div>
                <SheetFooter>
                    <Button :disabled="form.processing">Save</Button>
                    <SheetClose as-child>
                        <Button variant="outline"> Close </Button>
                    </SheetClose>
                </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
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
