// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightGitContributors from "starlight-git-contributors";
import starlightLinksValidatorPlugin from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightSidebarTopicsPlugin from "starlight-sidebar-topics";

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
							id: "system",
							label: "System",
							link: "/system/",
							icon: "server",
							items: [{ autogenerate: { directory: "system" } }],
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
