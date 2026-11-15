import { getCollection } from "astro:content";
import {
	defineRouteMiddleware,
	type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { systemRoute, systemRouteId, systemSlug } from "./lib/systems";
import { systemCategories, systemCategoryValues } from "./systems";

const collator = new Intl.Collator("sv", { sensitivity: "base" });

type SidebarEntry = StarlightRouteData["sidebar"][number];
type SidebarGroup = Extract<SidebarEntry, { type: "group" }>;
type SidebarLink = Extract<SidebarEntry, { type: "link" }>;
type PrevNextConfig = StarlightRouteData["entry"]["data"]["prev"];

function findLink(
	entries: SidebarEntry[],
	href: string,
	group?: SidebarGroup,
):
	| { link: SidebarLink; entries: SidebarEntry[]; group?: SidebarGroup }
	| undefined {
	for (const entry of entries) {
		if (entry.type === "link") {
			if (entry.href === href) return { link: entry, entries, group };
			continue;
		}

		const found = findLink(entry.entries, href, entry);
		if (found) return found;
	}

	return undefined;
}

function insertSystemEntries(
	entries: SidebarEntry[],
	indexLink: SidebarLink,
	systemEntries: SidebarLink[],
): SidebarEntry[] {
	const systemHrefs = new Set(systemEntries.map((entry) => entry.href));
	const remaining = entries.filter(
		(entry) => entry.type !== "link" || !systemHrefs.has(entry.href),
	);
	const index = remaining.indexOf(indexLink);

	if (index === -1) {
		throw new Error(
			`[lysdocs] Could not find the index link "${indexLink.href}" in its sidebar group.`,
		);
	}

	return [
		...remaining.slice(0, index + 1),
		...systemEntries,
		...remaining.slice(index + 1),
	];
}

// `flattenSidebar` and `applyPrevNextLinkConfig` mirror Starlight's internal navigation helpers.
// The global `pagination: false` setting is not handled here.
function flattenSidebar(entries: SidebarEntry[]): SidebarLink[] {
	return entries.flatMap((entry) =>
		entry.type === "group" ? flattenSidebar(entry.entries) : [entry],
	);
}

function applyPrevNextLinkConfig(
	link: SidebarLink | undefined,
	config: PrevNextConfig,
): SidebarLink | undefined {
	if (config === false) return undefined;
	if (config === true) return link;
	if (typeof config === "string" && link) return { ...link, label: config };
	if (typeof config === "object" && config !== null) {
		if (link) {
			return {
				...link,
				label: config.label ?? link.label,
				href: config.link ?? link.href,
				attrs: {},
			};
		}

		if (config.link && config.label) {
			return {
				type: "link",
				label: config.label,
				href: config.link,
				isCurrent: false,
				badge: undefined,
				attrs: {},
			};
		}
	}

	return link;
}

export const onRequest = defineRouteMiddleware(async (context, next) => {
	await next();

	const { starlightRoute } = context.locals;
	if (!starlightRoute.hasSidebar) return;

	const allSystems = await getCollection("systems");
	let changed = false;

	for (const category of systemCategoryValues) {
		const { path, topic } = systemCategories[category];

		// Only add systems for the topic currently displayed in the sidebar.
		if (!findLink(starlightRoute.sidebar, `/${topic}/`)) continue;

		const indexHref = `/${path}/`;

		const systemEntries: SidebarLink[] = allSystems
			.filter((system) => system.data.category === category)
			.sort((a, b) => collator.compare(a.data.title, b.data.title))
			.map((system) => {
				const id = systemSlug(system.id);

				return {
					type: "link",
					label: system.data.title,
					href: systemRoute(category, id),
					isCurrent: starlightRoute.id === systemRouteId(category, id),
					badge: undefined,
					attrs: {},
				};
			});

		if (systemEntries.length === 0) continue;

		const found = findLink(starlightRoute.sidebar, indexHref);

		if (!found?.group) {
			throw new Error(
				`[lysdocs] System category "${category}" has no sidebar group. Add an index.mdx for ${indexHref}.`,
			);
		}

		found.group.entries = insertSystemEntries(
			found.group.entries,
			found.link,
			systemEntries,
		);
		changed = true;
	}

	if (changed) {
		const links = flattenSidebar(starlightRoute.sidebar);
		const currentIndex = links.findIndex((link) => link.isCurrent);

		if (currentIndex !== -1) {
			const { prev, next } = starlightRoute.entry.data;

			starlightRoute.pagination = {
				prev: applyPrevNextLinkConfig(links[currentIndex - 1], prev),
				next: applyPrevNextLinkConfig(links[currentIndex + 1], next),
			};
		}
	}
});
