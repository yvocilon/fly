/// <reference types="vitest" />

import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./test/setup.ts"],
		include: ["./app/**/*.{test,spec}.{ts,tsx}"],
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./app"),
		},
	},
});
