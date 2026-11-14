import { getCollection } from "astro:content";
import {
	defineRouteMiddleware,
	type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import {
	slugifyPath,
	systemRoute,
	systemRouteId,
	systemSlug,
} from "./lib/systems";
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

		if (
			found &&
			(!found.group || slugifyPath(found.group.label) !== categorySlug)
		) {
			// The category index is a page inside a broader section (e.g. an
			// architecture page under Xenofarm), so nest the systems below it.
			const index = found.entries.indexOf(found.link);
			found.entries[index] = {
				type: "group",
				label: found.link.label,
				entries: [found.link, ...systemEntries].sort((a, b) =>
					sortSidebarEntries(indexHref, a, b),
				),
				collapsed: false,
				badge: found.link.badge,
			};
			continue;
		}

		if (!found?.group) continue;

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
