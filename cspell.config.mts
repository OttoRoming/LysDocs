// TypeScript version of the CSpell config.
// Requires Node.js >= 22.18 to run natively.
import { defineConfig } from "cspell";

export default defineConfig({
	version: "0.2",
	import: ["@cspell/dict-sv/cspell-ext.json"],
	language: "sv, sv_SE, en_US",
	dictionaryDefinitions: [
		{
			name: "project-words",
			path: "./project-words.txt",
			addWords: true,
		},
	],
	dictionaries: ["project-words"],
	ignorePaths: [
        "./**/*.svg"
    ],
	useGitignore: true,
});
