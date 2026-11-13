export const systemCategories = {
	"cpu-server": {
		path: "tjänster/cpu-servrar",
		topic: "tjänster",
	},
} as const;

export type SystemCategory = keyof typeof systemCategories;

export const systemCategoryValues = Object.keys(systemCategories) as [
	SystemCategory,
	...SystemCategory[],
];

export const defaultSystemCategory = systemCategoryValues[0];
