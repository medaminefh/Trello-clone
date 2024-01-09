// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
	nitro: {
		plugins: ["~/server/index.ts"],
	},
	plugins: [{ src: "~/plugins/drag-scroll", ssr: false }],
	ssr: true,
	app: {
		baseURL: "/Trello-clone",
		buildAssetsDir: "assets",
	},
	runtimeConfig: {
		MONGODB_URI: process.env.NUXT_MONGODB_URI,
	},
});
