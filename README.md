# Project creation steps

This project shows the issues currently surrounding having both `vitest` and `playwright` configured for the same project.

This project was created as follows:

```bash
$ npm init svelte@next
$ npm install
$ npx @preset/cli davipon/svelte-add-vitest --ts --msw --example
```

# Config changes
I have added changes to [vite.config.js](vite.config.js) and [playwright.config.js](playwright.config.ts) to segragate the test directories each will use. 

I have also made changes to [package.json](package.json) to add a couple of run targets for e2e and unit tests:

```json
   ...
	"scripts": {
        ...
		"test": "vitest --run && playwright test",
		"test:e2e": "playwright test",
		"test:unit": "vitest --run",
        ...
	},
    ...
```

# Tests
I have created two test directories: `tests/unit` and `tests/e2e` that each hold one reference test. 

# Errors
When running both unit and e2e tests, `playwright` times out:

```bash
$ npm test

> sveltekit-vitest@0.0.1 test
> vitest --run && playwright test


 RUN  v0.17.1 /home/my_projects/sveltekit-vitest-and-playwright

 ✓ src/routes/example.ts (1)
 ✓ tests/unit/basic.test.ts (1)

Test Files  2 passed (2)
     Tests  2 passed (2)
      Time  1.17s (in thread 60ms, 1946.02%)

(node:18783) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

Running 1 test using 1 worker

[WebServer] (node:18795) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] (node:18807) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] Generated an empty chunk: "hooks"
[WebServer] (node:18807) ExperimentalWarning: buffer.Blob is an experimental feature. This feature could change at any time
[WebServer] (node:18842) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[WebServer] (node:18854) ExperimentalWarning: --experimental-loader is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

Error: Timed out waiting 60000ms from config.webServer.




  1 skipped
$
```