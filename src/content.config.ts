import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";
import { autoSidebarLoader } from "starlight-auto-sidebar/loader";
import { autoSidebarSchema } from "starlight-auto-sidebar/schema";
import { topicSchema } from "starlight-sidebar-topics/schema";
import { systemCategoryValues } from "./systems";

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

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: topicSchema.extend({
				system: z.object(systemFields).strict().optional(),
			}),
		}),
	}),

	autoSidebar: defineCollection({
		loader: autoSidebarLoader(),
		schema: autoSidebarSchema(),
	}),
};
