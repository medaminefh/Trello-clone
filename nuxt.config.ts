// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
	plugins: [{ src: "~/plugins/drag-scroll", ssr: false }],
	ssr: false,
	app: {
		baseURL: "/Trello-clone",
		buildAssetsDir: "assets",
	},
});
