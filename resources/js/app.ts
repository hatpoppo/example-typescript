import "../css/app.css";
import "./bootstrap.js";

import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createApp, h } from "vue";
import { ZiggyVue } from "ziggy-js";
import type { Plugin } from "vue";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

type ContentsData = {
    el: string | Element;
    App: typeof Text | typeof Comment;
    props: null | undefined;
    plugin: Plugin<unknown[], unknown[]>;
};
createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: (name: string) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }: ContentsData) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
    },
});
