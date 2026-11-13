import { getCollection } from "astro:content";
import {
	defineRouteMiddleware,
	type StarlightRouteData,
} from "@astrojs/starlight/route-data";
import { systemRoute, systemRouteId } from "./lib/systems";
import { type SystemCategory, systemCategories } from "./settings";

const category: SystemCategory = "cpu-server";
const groupLabel = "CPU Servrar";
const indexHref = `/${systemCategories[category].path}/`;
const collator = new Intl.Collator("sv", { sensitivity: "base" });

type SidebarEntry = StarlightRouteData["sidebar"][number];

function sortSidebarEntries(a: SidebarEntry, b: SidebarEntry) {
	const aIsIndex = a.type === "link" && a.href === indexHref;
	const bIsIndex = b.type === "link" && b.href === indexHref;

	if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;

	return collator.compare(a.label, b.label);
}

export const onRequest = defineRouteMiddleware(async (context, next) => {
	await next();

	const { starlightRoute } = context.locals;

	const systems = (await getCollection("systems"))
		.filter((system) => system.data.category === category)
		.sort((a, b) => collator.compare(a.data.title, b.data.title));

	const systemEntries: SidebarEntry[] = systems.map((system) => ({
		type: "link",
		label: system.data.title,
		href: systemRoute(category, system.id),
		isCurrent: starlightRoute.id === systemRouteId(category, system.id),
		badge: undefined,
		attrs: {},
	}));

	const systemHrefs = new Set(
		systemEntries
			.filter((entry) => entry.type === "link")
			.map((entry) => entry.href),
	);

	const syncGroup = (entries: SidebarEntry[]): boolean => {
		for (const entry of entries) {
			if (entry.type !== "group") continue;

			const isSystemGroup = entry.entries.some(
				(child) => child.type === "link" && systemHrefs.has(child.href),
			);

			if (entry.label === groupLabel || isSystemGroup) {
				const remaining = entry.entries.filter(
					(child) => child.type !== "link" || !systemHrefs.has(child.href),
				);

				entry.entries = [...remaining, ...systemEntries].sort(
					sortSidebarEntries,
				);

				return true;
			}

			if (syncGroup(entry.entries)) return true;
		}

		return false;
	};

	syncGroup(starlightRoute.sidebar);
});
