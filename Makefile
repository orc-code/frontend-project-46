install:
	npm ci --legacy-peer-deps

publish:
	npm publish --dry-run

lint:
	npx eslint .

addPackage:
	npm link

test:
	npm test

test-coverage:
	npm run coverage
			