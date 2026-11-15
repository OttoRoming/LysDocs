// @ts-check

import { globSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightGitContributors from "starlight-git-contributors";
import starlightLinksValidatorPlugin from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightSidebarTopicsPlugin from "starlight-sidebar-topics";
import {
	resolveSystemCategory,
	slugifyPath,
	systemRoute,
} from "./src/lib/systems.ts";

const systemsDir = fileURLToPath(
	new URL("src/content/systems", import.meta.url),
);

// Exact routes for generated system pages. The link validator cannot see
// these pages, so exclude only the ones that actually exist.
const systemRoutes = new Set(
	globSync(`${systemsDir}/**/*.mdx`).flatMap((file) => {
		const category = readFileSync(file, "utf8").match(
			/^category\s*:\s*["']?([^"'\s#]+)["']?\s*(?:#.*)?$/m,
		)?.[1];

		if (!category) return [];

		const route = systemRoute(
			resolveSystemCategory(category),
			slugifyPath(basename(file)),
		);

		return [route, route.slice(0, -1)];
	}),
);

// https://astro.build/config
export default defineConfig({
	site: "https://docs.lysator.liu.se",
	integrations: [
		starlight({
			title: "LysDocs",
			logo: {
				src: "./src/assets/lysdocs.svg",
			},
			social: [
				{
					icon: "forgejo",
					label: "Forge",
					href: "https://forge.lysator.liu.se/lysdocs/lysdocs",
				},
			],
			editLink: {
				baseUrl: "https://forge.lysator.liu.se/lysdocs/lysdocs/_edit/main/",
			},
			markdown: {
				processedDirs: ["./src/content/systems"],
			},
			routeMiddleware: ["./src/starlightRouteData.ts"],
			components: {
				Header: "./src/components/overrides/Header.astro",
				PageTitle: "./src/components/overrides/PageTitle.astro",
				Sidebar: "./src/components/overrides/Sidebar.astro",
				ThemeProvider: "./src/components/overrides/ThemeProvider.astro",
				ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
			},
			customCss: ["./src/styles/custom.css"],
			plugins: [
				starlightLlmsTxt(),
				starlightGitContributors(),
				starlightAutoSidebar(),
				starlightLinksValidatorPlugin({
					errorOnLocalLinks: false,
					// the validator doesn't know about generated system pages
					exclude: ({ link }) => {
						const path = link.split(/[?#]/, 1)[0] ?? link;
						return systemRoutes.has(path);
					},
				}),
				starlightSidebarTopicsPlugin(
					[
						{
							id: "kom-igång",
							label: "Kom igång",
							link: "/kom-igång/",
							icon: "open-book",
							items: [{ autogenerate: { directory: "kom-igång" } }],
						},
						{
							id: "tjänster",
							label: "Tjänster",
							link: "/tjänster/",
							icon: "information",
							items: [{ autogenerate: { directory: "tjänster" } }],
						},
						{
							id: "guider",
							label: "Guider",
							link: "/guider/",
							icon: "pencil",
							items: [{ autogenerate: { directory: "guider" } }],
						},
						{
							id: "rootmanualen",
							label: "Rootmanualen",
							link: "/rootmanualen/",
							icon: "setting",
							items: [{ autogenerate: { directory: "rootmanualen" } }],
						},
					],
					{ exclude: ["/", "index"] },
				),
			],
		}),
	],
});
