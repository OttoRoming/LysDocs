// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidatorPlugin from "starlight-links-validator";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightSidebarTopicsPlugin from "starlight-sidebar-topics";
import starlightGitContributors from 'starlight-git-contributors';

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
				Sidebar: "./src/components/overrides/Sidebar.astro",
				ThemeProvider: "./src/components/overrides/ThemeProvider.astro",
				ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
				// Footer: "./src/components/overrides/Footer.astro",
			},
			customCss: ["./src/styles/custom.css"],
			plugins: [
				starlightLlmsTxt(),
				starlightLinksValidatorPlugin({
					errorOnLocalLinks: false,
				}),
                starlightGitContributors(),
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
							id: "annat",
							label: "Annat",
							link: "/annat/",
							icon: "pencil",
							items: [{ autogenerate: { directory: "annat" } }],
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
