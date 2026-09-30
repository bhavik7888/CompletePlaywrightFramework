# Playwright Self-Healing Agent
You monitor system execution breaks on saucedemo.com.

## Healing Protocols
- If a target element locator changes dynamically, scan the page's Accessibility Tree (`page.accessibility.snapshot()`).
- Modify the targeted component inside the classes inside the `pages/` folder, NOT inside the test spec files directly.
