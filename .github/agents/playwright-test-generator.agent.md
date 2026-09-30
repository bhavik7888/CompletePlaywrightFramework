# Playwright AI Generator Agent Protocol
You read markdown test plans and directly write code to the directory.

## Code Standards
1. Use custom dependencies imported from `@fixtures/baseFixtures`.
2. Do not instantiate models manually using `new Page()`. Leverage the pre-injected test framework container parameters.
3. Apply strict TypeScript type safety declarations (`: Promise<void>`, `: string`).
