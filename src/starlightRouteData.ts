import { getCollection } from "astro:content";
import {
	defineRouteMiddleware,
	type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { slugifyPath, systemRoute, systemRouteId } from "./lib/systems";
import { systemCategories, systemCategoryValues } from "./settings";

const collator = new Intl.Collator("sv", { sensitivity: "base" });

type SidebarEntry = StarlightRouteData["sidebar"][number];
type SidebarGroup = Extract<SidebarEntry, { type: "group" }>;
type SidebarLink = Extract<SidebarEntry, { type: "link" }>;

function sortSidebarEntries(
	indexHref: string,
	a: SidebarEntry,
	b: SidebarEntry,
) {
	const aIsIndex = a.type === "link" && a.href === indexHref;
	const bIsIndex = b.type === "link" && b.href === indexHref;

	if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;

	return collator.compare(a.label, b.label);
}

function findLinkInGroup(
	group: SidebarGroup,
	href: string,
): { link: SidebarLink; group: SidebarGroup } | undefined {
	for (const entry of group.entries) {
		if (entry.type === "link") {
			if (entry.href === href) return { link: entry, group };
			continue;
		}

		const found = findLinkInGroup(entry, href);
		if (found) return found;
	}

	return undefined;
}

function findLink(
	sidebar: SidebarEntry[],
	href: string,
): { link: SidebarLink; group: SidebarGroup } | undefined {
	for (const entry of sidebar) {
		if (entry.type !== "group") continue;

		const found = findLinkInGroup(entry, href);
		if (found) return found;
	}

	return undefined;
}

export const onRequest = defineRouteMiddleware(async (context, next) => {
	await next();

	const { starlightRoute } = context.locals;
	const allSystems = await getCollection("systems");

	for (const category of systemCategoryValues) {
		const { path } = systemCategories[category];
		const indexHref = `/${path}/`;
		const categorySlug = slugifyPath(path.split("/").at(-1) ?? "");

		const systemEntries: SidebarLink[] = allSystems
			.filter((system) => system.data.category === category)
			.sort((a, b) => collator.compare(a.data.title, b.data.title))
			.map((system) => ({
				type: "link",
				label: system.data.title,
				href: systemRoute(category, system.id),
				isCurrent: starlightRoute.id === systemRouteId(category, system.id),
				badge: undefined,
				attrs: {},
			}));

		if (systemEntries.length === 0) continue;

		const found = findLink(starlightRoute.sidebar, indexHref);

		if (found && slugifyPath(found.group.label) !== categorySlug) {
			// The category index is a page inside a broader section (e.g. an
			// architecture page under Xenofarm), so nest the systems below it.
			found.group.entries = found.group.entries.map((entry) =>
				entry === found.link
					? {
							type: "group",
							label: found.link.label,
							entries: [found.link, ...systemEntries].sort((a, b) =>
								sortSidebarEntries(indexHref, a, b),
							),
							collapsed: false,
							badge: found.link.badge,
						}
					: entry,
			);
			continue;
		}

		if (!found) continue;

		const group = found.group;

		const systemHrefs = new Set(systemEntries.map((entry) => entry.href));
		const remaining = group.entries.filter(
			(entry) => entry.type !== "link" || !systemHrefs.has(entry.href),
		);

		group.entries = [...remaining, ...systemEntries].sort((a, b) =>
			sortSidebarEntries(indexHref, a, b),
		);
	}
});
