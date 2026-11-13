export const systemCategories = {
	"cpu-server": {
		path: "tjänster/cpu-servrar",
		topic: "tjänster",
	},
	arbetsstation: {
		path: "tjänster/tilde/arbetsstationer",
		topic: "tjänster",
	},
	"xenofarm-alpha": {
		path: "tjänster/xenofarm/alpha",
		topic: "tjänster",
	},
	"xenofarm-sparc": {
		path: "tjänster/xenofarm/sparc",
		topic: "tjänster",
	},
} as const;

export type SystemCategory = keyof typeof systemCategories;

export const systemCategoryValues = Object.keys(systemCategories) as [
	SystemCategory,
	...SystemCategory[],
];

export const defaultSystemCategory = systemCategoryValues[0];
