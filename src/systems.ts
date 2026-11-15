export const systemCategories = {
	"cpu-server": "CPU Servrar",
	arbetsstation: "Arbetsstationer",
	"xenofarm-alpha": "Xenofarm Alpha",
	"xenofarm-sparc": "Xenofarm SPARC",
	rootinfo: "Rootspecifik systeminfo",
} as const;

export type SystemCategory = keyof typeof systemCategories;

export const systemCategoryValues = Object.keys(systemCategories) as [
	SystemCategory,
	...SystemCategory[],
];
