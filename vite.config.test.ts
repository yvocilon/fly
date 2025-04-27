/// <reference types="vitest" />

import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./test/setup.ts"],
		include: ["**/*.{test,spec}.{ts,tsx}"],
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./app"),
		},
	},
});
