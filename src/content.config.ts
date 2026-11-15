import { defineCollection } from "astro:content";
import { basename } from "node:path";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob, type Loader, type ParseDataOptions } from "astro/loaders";
import { z } from "astro/zod";
import { autoSidebarLoader } from "starlight-auto-sidebar/loader";
import { autoSidebarSchema } from "starlight-auto-sidebar/schema";
import { topicSchema } from "starlight-sidebar-topics/schema";
import {
	resolveSystemCategory,
	slugifyPath,
	systemRouteId,
} from "./lib/systems";
import { systemCategories, systemCategoryValues } from "./systems";

const docsExtensions = [
	"markdown",
	"mdown",
	"mkdn",
	"mkd",
	"mdwn",
	"md",
	"mdx",
];

const systemFields = {
	os: z.string().optional(),
	arch: z.string().optional(),
	model: z.string().optional(),
	cpu: z.string().optional(),
	ram: z.string().optional(),
	gpu: z.string().optional(),
	placement: z.string().optional(),
	admin: z.string().optional(),
	namedAfter: z.string().optional(),
	sshFingerprint: z.string().optional(),

	category: z.enum(systemCategoryValues),
};

function isSystemEntry(filePath: string | undefined) {
	return filePath?.replaceAll("\\", "/").includes("/content/systems/") ?? false;
}

/**
 * LysDocs uses it's own docsLoader in order to automatically
 * generate system pages for systems from the system collection
 */
function docsLoader(): Loader {
	return {
		name: "lysdocs-docs-loader",
		load(context) {
			const loader = glob({
				// Resolve against `srcDir` instead of hardcoding `./src` so a
				// custom `srcDir` in the Astro config keeps working.
				base: new URL("content/", context.config.srcDir).href,
				pattern: [
					`docs/**/[^_]*.{${docsExtensions.join(",")}}`,
					"systems/**/[^_]*.mdx",
				],
				generateId({ entry, data }) {
					if (entry.startsWith("systems/")) {
						const category = resolveSystemCategory(data.category);
						const name = basename(entry.slice("systems/".length));

						return systemRouteId(category, slugifyPath(name));
					}

					return slugifyPath(entry.slice("docs/".length)).replace(
						/\/index$/,
						"",
					);
				},
			});

			return loader.load({
				...context,
				parseData: <TData extends Record<string, unknown>>(
					options: ParseDataOptions<TData>,
				) => {
					const data = isSystemEntry(options.filePath)
						? ({
								...options.data,
								topic:
									systemCategories[resolveSystemCategory(options.data.category)]
										.topic,
							} as TData)
						: options.data;

					return context.parseData({ ...options, data });
				},
			});
		},
	};
}

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: topicSchema.extend(z.object(systemFields).partial().shape),
		}),
	}),

	autoSidebar: defineCollection({
		loader: autoSidebarLoader(),
		schema: autoSidebarSchema(),
	}),

	systems: defineCollection({
		loader: glob({
			base: "./src/content/systems",
			pattern: "**/*.mdx",
			generateId: ({ entry }) => slugifyPath(entry),
		}),
		schema: (context) =>
			docsSchema({
				extend: topicSchema.extend(systemFields),
			})(context).strict(),
	}),
};
