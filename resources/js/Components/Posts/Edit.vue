<script setup lang="ts">
import { useForm, usePage } from "@inertiajs/vue3";
import { Button } from "@/components/ui/button";
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

const { handleSubmit, resetForm } = useValidateForm({
    validationSchema: formSchema,
    initialValues: {
        title: props.post ? props.post.title : "",
        excerpt: props.post ? props.post.excerpt : "",
        body: props.post ? props.post.body : "",
    },
});
const onSubmit = handleSubmit((values) => {
    Object.assign(form, values);
    const attrs = <{ onClick: () => {} }>closebuttonRef.value.$attrs;
    attrs.onClick();
    props.post
        ? form.patch(route("posts.update", props.post.id))
        : form.post(route("posts.store"));
});
const sheetbuttonRef = useTemplateRef("sheetbutton");
const closebuttonRef = useTemplateRef("closebutton");
defineExpose({ openSheet });
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
                        <Button variant="outline" ref="closebutton">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </form>
        </SheetContent>
    </Sheet>
</template>
