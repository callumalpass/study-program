# CI/CD Pipelines

## Introduction

Continuous Integration and Continuous Deployment (CI/CD) represent fundamental practices in modern software development that automate the process of testing, building, and deploying applications. CI/CD pipelines transform how teams deliver software by catching bugs early, ensuring consistent builds across environments, and enabling rapid iteration cycles that would be impossible with manual processes.

At its core, Continuous Integration means automatically testing every code change as it's committed to version control. Developers merge their work frequently—multiple times per day—and automated tests run immediately to verify nothing broke. Continuous Deployment extends this concept by automatically releasing validated changes to production, eliminating manual deployment steps and reducing the time between writing code and delivering value to users. For capstone projects, implementing CI/CD demonstrates professional software engineering practices and ensures your application maintains quality as it evolves.

## Understanding CI/CD Fundamentals

CI/CD pipelines consist of several key stages that code passes through automatically. The typical pipeline begins with a trigger event, usually a git push or pull request. This triggers the integration server to clone your repository, install dependencies, and prepare a clean environment. Next comes the build stage, where your application is compiled or bundled. For TypeScript projects, this means running `tsc` to compile to JavaScript and bundling assets. The build stage catches syntax errors and ensures your code can actually be packaged for deployment.

Following the build comes automated testing. Your pipeline runs unit tests, integration tests, and potentially end-to-end tests to verify functionality. This automated testing provides immediate feedback—within minutes of pushing code, you know if you've broken something. The faster this feedback loop, the easier it is to fix issues while the code is fresh in your mind. Some teams include additional quality gates like linting, security scans, or code coverage checks that must pass before proceeding.

The final stage is deployment. If all previous steps succeed, the pipeline automatically deploys your application to staging or production environments. This might involve building a Docker container, uploading static files to a CDN, or triggering a serverless function deployment. The key is that deployment is automated, repeatable, and consistent—the same process runs every time, eliminating "works on my machine" problems.

## Implementing GitHub Actions

GitHub Actions has become the de facto standard for CI/CD in projects hosted on GitHub. It's free for public repositories and includes generous free tier limits for private repositories. GitHub Actions uses YAML configuration files stored in `.github/workflows/` to define your pipeline. Here's a comprehensive example for a TypeScript web application:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json

  build:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to production
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          npm install -g vercel
          vercel deploy --prod --token=$VERCEL_TOKEN
```

This workflow demonstrates several important concepts. The `on` section defines triggers—this pipeline runs on pushes to main or develop branches and on pull requests targeting main. The workflow contains three jobs: test, build, and deploy. Jobs run in parallel by default, but we use `needs` to create dependencies—build waits for test to succeed, and deploy waits for build.

Each job consists of steps that run sequentially. Steps can use pre-built actions from the GitHub Actions marketplace (like `actions/checkout` and `actions/setup-node`) or run custom commands. The `if` condition on the deploy job ensures deployment only happens for main branch pushes, not for pull requests or other branches.

## Environment Variables and Secrets

CI/CD pipelines need access to secrets like API keys, deployment tokens, and database credentials. GitHub provides secure secret management through repository or organization secrets. These are encrypted and only exposed to workflow runs, never visible in logs. Access secrets using the `${{ secrets.SECRET_NAME }}` syntax.

For environment-specific configuration, use environment variables. You can define these in your workflow file, but sensitive values should always use secrets:

```yaml
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

Never commit secrets to your repository. If you accidentally commit a secret, rotate it immediately—once it's in git history, it's compromised even if you delete it in a later commit.

## Caching Dependencies

One of the most effective optimizations for CI/CD pipelines is caching dependencies. Installing npm packages can take several minutes, but most runs use identical dependencies. GitHub Actions provides built-in caching:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

This caches `node_modules` based on your `package-lock.json` hash. When the lockfile doesn't change between runs, the cache is restored, dramatically reducing installation time from minutes to seconds.

## Key Takeaways

- CI/CD automates testing and deployment, providing fast feedback and reducing human error
- GitHub Actions workflows are defined in YAML files in `.github/workflows/`
- Pipelines typically include build, test, and deploy stages that run automatically on code changes
- Use `needs` to create job dependencies and control execution order
- Store sensitive values in GitHub Secrets, never commit them to the repository
- Caching dependencies significantly speeds up pipeline execution
- Run different steps based on branch, event type, or custom conditions using `if` clauses
- Automated testing in CI catches bugs before they reach production

## Common Mistakes

### Mistake 1: Slow Pipeline Due to No Caching
**Problem:** Every pipeline run installs all dependencies from scratch, taking 5-10 minutes just for installation. This slows down feedback and wastes compute resources.

**Solution:** Enable dependency caching using the `cache` option in `setup-node`. For more complex scenarios, use the `actions/cache` action directly to cache additional directories like build outputs or test fixtures.

### Mistake 2: Deploying Without Testing
**Problem:** The deploy job runs in parallel with tests, meaning broken code can reach production if tests are slower than deployment.

**Solution:** Use the `needs` keyword to make deploy depend on test completion. Never deploy unless all quality gates pass. Consider additional gates like security scans or performance benchmarks for critical applications.

### Mistake 3: Secrets in Logs or Code
**Problem:** Accidentally logging secrets or committing them to the repository exposes sensitive credentials. Once in git history, they're compromised.

**Solution:** Use GitHub Secrets for all sensitive values. GitHub automatically masks secret values in logs. Add sensitive file patterns to `.gitignore`. Use tools like `git-secrets` to prevent accidental commits. If a secret is exposed, rotate it immediately.

### Mistake 4: No Conditional Deployment
**Problem:** Every branch push triggers production deployment, meaning experimental branches or pull requests deploy to production.

**Solution:** Use `if: github.ref == 'refs/heads/main'` or similar conditions to restrict deployment to specific branches. Deploy feature branches to preview environments, not production. Use different workflows for different deployment targets.

### Mistake 5: Ignoring Failed Pipelines
**Problem:** Developers push code, ignore the failing CI pipeline, and continue working. Broken tests accumulate, and the pipeline loses value.

**Solution:** Make passing CI a requirement for merging. Use GitHub branch protection rules to block merges when checks fail. Fix broken tests immediately—a broken test suite that nobody trusts is worse than no tests. Set up notifications so the team knows when pipelines fail.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Continuous Integration: Improving Software Quality and Reducing Risk](https://martinfowler.com/books/duvall.html) by Paul Duvall
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
