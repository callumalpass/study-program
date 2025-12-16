# Package Managers

Package managers are tools that automate the process of installing, updating, configuring, and removing software packages. In JavaScript development, package managers handle dependencies, scripts, and project configuration, making it easy to share and reuse code across projects and teams.

## npm (Node Package Manager)

npm is the default package manager for Node.js and the largest software registry in the world.

```bash
# Initialize a new project
npm init
# Or use defaults
npm init -y

# Installing packages
npm install lodash
npm install react react-dom
npm i express # 'i' is shorthand for 'install'

# Install as dev dependency
npm install --save-dev jest
npm install -D eslint # -D is shorthand for --save-dev

# Install specific version
npm install react@18.2.0
npm install lodash@^4.17.21 # Latest patch version
npm install express@~4.18.0 # Latest minor version

# Install globally
npm install -g typescript
npm install --global create-react-app

# Uninstall packages
npm uninstall lodash
npm remove react # 'remove' is alias for 'uninstall'
npm rm express # 'rm' is another alias

# Update packages
npm update # Update all packages
npm update react # Update specific package
npm update -g # Update global packages

# List installed packages
npm list
npm list --depth=0 # Only show top-level packages
npm list -g --depth=0 # List global packages

# View package information
npm view react
npm info lodash
npm show express versions # Show all available versions

# Search for packages
npm search react
npm search testing

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit
npm audit fix # Automatically fix vulnerabilities
npm audit fix --force # Fix even breaking changes
```

## package.json

The package.json file defines project metadata, dependencies, and scripts.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "webpack --mode production",
    "test": "jest",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  },
  "keywords": ["web", "development"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "react": "^18.2.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "eslint": "^8.40.0",
    "webpack": "^5.80.0",
    "nodemon": "^2.0.22"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-project"
  },
  "bugs": {
    "url": "https://github.com/username/my-project/issues"
  }
}
```

## Semantic Versioning

Understanding version numbers and ranges is crucial for dependency management.

```javascript
// Version format: MAJOR.MINOR.PATCH
// Example: 1.2.3

// MAJOR: Breaking changes (1.0.0 -> 2.0.0)
// MINOR: New features, backward compatible (1.0.0 -> 1.1.0)
// PATCH: Bug fixes (1.0.0 -> 1.0.1)

// Version ranges in package.json
{
  "dependencies": {
    // Exact version
    "exact": "1.2.3",

    // Greater than or equal
    "gte": ">=1.2.3",

    // Less than
    "lt": "<2.0.0",

    // Range
    "range": ">=1.2.3 <2.0.0",

    // Caret (^) - Allow changes that don't modify left-most non-zero digit
    "caret": "^1.2.3", // Allows 1.2.3 to <2.0.0
    "caret-zero": "^0.2.3", // Allows 0.2.3 to <0.3.0

    // Tilde (~) - Allow patch-level changes
    "tilde": "~1.2.3", // Allows 1.2.3 to <1.3.0

    // Wildcard
    "wildcard": "1.2.*", // Any patch version of 1.2

    // Latest
    "latest": "latest", // Not recommended for production

    // Git repositories
    "from-git": "git://github.com/user/repo.git#commit-hash",

    // Local file
    "local": "file:../local-package"
  }
}

// Example: How ^ works
"^1.2.3" // 1.2.3, 1.2.4, 1.3.0, 1.9.9 (but not 2.0.0)
"^0.2.3" // 0.2.3, 0.2.4 (but not 0.3.0)
"^0.0.3" // 0.0.3 only (exact)

// Example: How ~ works
"~1.2.3" // 1.2.3, 1.2.4, 1.2.9 (but not 1.3.0)
"~1.2" // 1.2.0, 1.2.9 (but not 1.3.0)
```

## package-lock.json

The lock file ensures consistent installations across environments.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-project",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      }
    },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "accepts": "~1.3.8",
        "body-parser": "1.20.1"
      }
    }
  }
}

// Lock file ensures:
// 1. Exact versions of all dependencies and sub-dependencies
// 2. Same installation across all environments
// 3. Faster installs (no need to resolve versions)
// 4. Security through integrity checks

// Commands related to lock file
// npm ci # Clean install using lock file (recommended for CI/CD)
// npm install # Updates lock file if package.json changed
```

## npm Scripts

Scripts automate common development tasks.

```json
{
  "scripts": {
    // Basic scripts
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest",

    // Pre and post hooks (run automatically)
    "pretest": "eslint src",
    "posttest": "echo 'Tests completed'",
    "prebuild": "npm run clean",
    "postbuild": "npm run analyze",

    // Lifecycle scripts
    "prepare": "npm run build", // Runs before package is packed or published
    "prepublishOnly": "npm test", // Runs before publish

    // Composite scripts
    "clean": "rm -rf dist",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js",
    "validate": "npm run lint && npm run test",
    "build:prod": "npm run clean && npm run validate && npm run build",

    // Parallel execution
    "watch:js": "webpack --watch",
    "watch:css": "sass --watch src/scss:dist/css",
    "watch": "npm run watch:js & npm run watch:css",

    // Environment-specific
    "start:dev": "NODE_ENV=development node server.js",
    "start:prod": "NODE_ENV=production node server.js",

    // Custom commands
    "deploy": "npm run build && aws s3 sync dist/ s3://my-bucket",
    "serve": "http-server dist -p 8080"
  }
}

// Running scripts
// npm start # Runs 'start' script
// npm test # Runs 'test' script
// npm run dev # Runs 'dev' script (custom scripts need 'run')
// npm run build:prod # Runs 'build:prod' script

// Passing arguments to scripts
// npm run test -- --coverage
// npm run build -- --watch

// Using npx to run packages without installing globally
// npx create-react-app my-app
// npx eslint src/**/*.js
```

## Yarn

Yarn is an alternative package manager that offers faster, more reliable installations.

```bash
# Initialize project
yarn init
yarn init -y

# Installing packages
yarn add lodash
yarn add react react-dom
yarn add --dev jest # Dev dependency
yarn add -D eslint # Shorthand

# Install from lock file
yarn install
yarn # Shorthand for install

# Remove packages
yarn remove lodash

# Update packages
yarn upgrade
yarn upgrade react
yarn upgrade-interactive # Interactive upgrade

# List packages
yarn list
yarn list --depth=0

# View package info
yarn info react

# Check for outdated
yarn outdated

# Security audit
yarn audit
yarn audit fix

# Global packages
yarn global add typescript
yarn global remove typescript

# Run scripts
yarn start
yarn test
yarn build

# Why a package is installed
yarn why lodash

# Clean cache
yarn cache clean
```

## yarn.lock

Similar to package-lock.json but for Yarn.

```yaml
# yarn.lock
express@^4.18.2:
  version "4.18.2"
  resolved "https://registry.yarnpkg.com/express/-/express-4.18.2.tgz"
  integrity sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==
  dependencies:
    accepts "~1.3.8"
    body-parser "1.20.1"
```

## pnpm

pnpm is a fast, disk space efficient package manager.

```bash
# Install pnpm
npm install -g pnpm

# Initialize project
pnpm init

# Installing packages
pnpm add react
pnpm add -D jest
pnpm add -g typescript

# Install all dependencies
pnpm install
pnpm i

# Remove packages
pnpm remove react

# Update
pnpm update
pnpm up react

# List packages
pnpm list

# Run scripts
pnpm start
pnpm test

# Prune unnecessary packages
pnpm prune

# Why pnpm?
# 1. Disk space efficient (uses hard links)
# 2. Faster installations
# 3. Strict node_modules structure
# 4. Better monorepo support
```

## Dependency Types

Understanding different dependency types is important.

```json
{
  "dependencies": {
    // Production dependencies
    // Needed to run the application
    "express": "^4.18.2",
    "react": "^18.2.0"
  },

  "devDependencies": {
    // Development dependencies
    // Only needed during development
    "jest": "^29.5.0",
    "webpack": "^5.80.0",
    "eslint": "^8.40.0"
  },

  "peerDependencies": {
    // Expected to be provided by the consuming project
    // Common in plugins and libraries
    "react": "^18.0.0"
  },

  "optionalDependencies": {
    // Optional enhancements
    // Installation failure won't cause overall failure
    "fsevents": "^2.3.2"
  },

  "bundledDependencies": [
    // Will be bundled when package is published
    "my-custom-package"
  ]
}
```

## npm Configuration

Configuring npm for your environment and preferences.

```bash
# View configuration
npm config list
npm config list -l # Show all defaults

# Set configuration
npm config set registry https://registry.npmjs.org/
npm config set save-exact true # Save exact versions
npm config set init-author-name "Your Name"
npm config set init-license "MIT"

# Get configuration value
npm config get registry

# Delete configuration
npm config delete registry

# Edit configuration file directly
npm config edit

# .npmrc file (project-level configuration)
# .npmrc
registry=https://registry.npmjs.org/
save-exact=true
package-lock=true

# User-level .npmrc
# ~/.npmrc
init-author-name=Your Name
init-license=MIT

# Set authentication token
npm config set //registry.npmjs.org/:_authToken=YOUR_TOKEN
```

## Publishing Packages

Creating and publishing your own npm packages.

```bash
# Create account
npm adduser

# Login
npm login

# Prepare package.json for publishing
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "Does awesome things",
  "main": "index.js",
  "files": [
    "dist",
    "README.md"
  ],
  "publishConfig": {
    "access": "public"
  }
}

# Publish package
npm publish

# Publish scoped package
npm publish --access public

# Update package version
npm version patch # 1.0.0 -> 1.0.1
npm version minor # 1.0.0 -> 1.1.0
npm version major # 1.0.0 -> 2.0.0

# Publish with tag
npm publish --tag beta

# Deprecate a version
npm deprecate my-package@1.0.0 "Use version 2.0.0 instead"

# Unpublish (within 72 hours)
npm unpublish my-package@1.0.0
```

## Workspaces and Monorepos

Managing multiple packages in a single repository.

```json
// package.json (root)
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}

// packages/package-a/package.json
{
  "name": "@myorg/package-a",
  "version": "1.0.0",
  "dependencies": {
    "@myorg/package-b": "^1.0.0"
  }
}

// packages/package-b/package.json
{
  "name": "@myorg/package-b",
  "version": "1.0.0"
}

// npm workspace commands
npm install react --workspace=packages/package-a
npm run build --workspace=packages/package-a
npm run test --workspaces
```

## Best Practices

```javascript
// 1. Use lock files
// Always commit package-lock.json or yarn.lock

// 2. Use exact versions for critical dependencies
{
  "dependencies": {
    "critical-package": "1.2.3" // Exact version
  }
}

// 3. Keep dependencies up to date
// Regularly run: npm outdated
// Update with: npm update

// 4. Audit for security
// Run: npm audit
// Fix: npm audit fix

// 5. Use .npmignore to exclude files from published package
// .npmignore
tests/
.env
*.log

// 6. Document dependencies
// Use comments in package.json
{
  "dependencies": {
    "express": "^4.18.2", // Web framework
    "lodash": "^4.17.21" // Utility library
  }
}

// 7. Use npm ci in CI/CD pipelines
// Faster and more reliable than npm install

// 8. Version your package properly
// Follow semantic versioning: MAJOR.MINOR.PATCH

// 9. Use scoped packages for organization
{
  "name": "@mycompany/my-package"
}

// 10. Clean install periodically
// rm -rf node_modules package-lock.json
// npm install
```

## Comparison: npm vs Yarn vs pnpm

```javascript
const comparison = {
  npm: {
    pros: [
      'Default for Node.js',
      'Largest registry',
      'Well-documented',
      'Widely adopted'
    ],
    cons: [
      'Slower than alternatives',
      'More disk space usage',
      'Can have inconsistent installs'
    ],
    useCase: 'General purpose, standard choice'
  },

  yarn: {
    pros: [
      'Faster than npm',
      'Better offline mode',
      'Workspaces support',
      'Deterministic installs'
    ],
    cons: [
      'Extra tool to install',
      'Two lock files to manage',
      'Less widely adopted than npm'
    ],
    useCase: 'Teams prioritizing speed and consistency'
  },

  pnpm: {
    pros: [
      'Fastest installation',
      'Disk space efficient',
      'Strict by default',
      'Great for monorepos'
    ],
    cons: [
      'Smallest user base',
      'Stricter than others (can be pro or con)',
      'Different node_modules structure'
    ],
    useCase: 'Large projects, monorepos, disk space constrained'
  }
};
```

## Conclusion

Package managers are essential tools in modern JavaScript development, handling dependencies, scripts, and project configuration. npm is the standard and most widely used, Yarn offers improved performance and reliability, while pnpm provides the best performance and disk efficiency. Understanding how to use these tools effectively, manage dependencies properly, and follow best practices is crucial for maintaining healthy, secure, and efficient projects.
