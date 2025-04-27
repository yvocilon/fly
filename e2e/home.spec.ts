import { expect, test } from "@playwright/test";

test("should show no flights found when no flights are found", async ({
	page,
}) => {
	await page.goto("/"); // Uses the baseURL defined in the configuration

	await expect(page).toHaveTitle("Search and Find flights");

	const header = await page.locator("h1");
	await expect(header).toHaveText("All departing flights toAll destinations");

	await page.locator("input[name='search']").fill("Amsterdam");

	await page.getByRole("button", { name: "Search" }).click();

	await page.waitForSelector('[data-testid="skeleton-loader"]', {
		state: "detached",
	});

	const searchResults = page.getByText("No flights found for 'amsterdam'");

	expect(searchResults).toBeVisible();
});

test("should show no more than 5 results", async ({ page }) => {
	await page.goto("/");

	// Fill in the search input
	await page.locator("input[name='search']").fill("London");

	await page.getByRole("button", { name: "Search" }).click();

	await page.waitForSelector('[data-testid="skeleton-loader"]', {
		state: "detached",
	});

	// Wait for flight cards to be visible and get them
	const searchResults = page.locator("[data-testid='flight-card']");
	await expect(searchResults.first()).toBeVisible();

	// Get the count of flight cards
	const count = await searchResults.count();

	expect(count).toBeLessThanOrEqual(5);
});

test("changing the order by date", async ({ page }) => {
	await page.goto("/");

	await page.locator("input[name='search']").fill("London");

	await page.locator("select[name='order']").selectOption("desc");

	await page.getByRole("button", { name: "Search" }).click();

	await page.waitForSelector('[data-testid="skeleton-loader"]', {
		state: "detached",
	});

	// Get all flight cards
	const flightCards = await page.locator('[data-testid="flight-card"]').all();

	const datetimes = await Promise.all(
		flightCards.map(async (card) => {
			const date = await card
				.locator('[data-testid="flight-date"]')
				.innerText();
			const expectedTimeLocator = card.locator(
				'[data-testid="flight-expected-time"]',
			);
			const isExpectedTimeVisible = await expectedTimeLocator.isVisible();

			const time = isExpectedTimeVisible
				? await expectedTimeLocator.innerText()
				: await card
						.locator('[data-testid="flight-original-time"]')
						.innerText();

			// Combine date and time into a full Date object
			return new Date(`${date} ${time}`);
		}),
	);

	// Check that the datetimes are sorted descending
	for (let i = 0; i < datetimes.length - 1; i++) {
		expect(datetimes[i].getTime()).toBeGreaterThanOrEqual(
			datetimes[i + 1].getTime(),
		);
	}
});
