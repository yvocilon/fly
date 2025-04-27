import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

if (!process.env.BASE_URL) {
	throw new Error("BASE_URL is not set");
}

export default defineConfig({
	webServer: {
		command: "npm run dev:playwright",
		url: "http://localhost:5173",
		reuseExistingServer: !process.env.CI,
		stdout: "ignore",
		stderr: "pipe",
	},
	testDir: "./e2e",
	use: {
		baseURL: process.env.BASE_URL,
		trace: "on-first-retry",
	},
});
