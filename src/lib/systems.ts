import { slug as githubSlug } from "github-slugger";
import {
	defaultSystemCategory,
	type SystemCategory,
	systemCategories,
} from "../settings";

export function resolveSystemCategory(value: unknown): SystemCategory {
	return typeof value === "string" && value in systemCategories
		? (value as SystemCategory)
		: defaultSystemCategory;
}

/** Emulates Astro's slug generation so entry IDs and URLs stay stable. */
export function slugifyPath(path: string) {
	return path
		.replace(/\.[^./]+$/, "")
		.split("/")
		.map((segment) => githubSlug(segment))
		.join("/");
}

export function systemRouteId(category: SystemCategory, id: string) {
	return `${systemCategories[category].path}/${id}`;
}

/** Systems collection IDs include their directory; routes only use the leaf. */
export function systemSlug(id: string) {
	return id.split("/").at(-1) ?? id;
}

export function systemRoute(category: SystemCategory, id: string) {
	return `/${systemRouteId(category, id)}/`;
}
