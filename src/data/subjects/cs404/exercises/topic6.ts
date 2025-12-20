import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs404-t6-ex01',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Basic GitHub Actions Workflow',
    difficulty: 1,
    description: 'Create a basic GitHub Actions workflow YAML configuration that runs on push to main branch and executes npm install and npm test commands.',
    starterCode: `// Create a GitHub Actions workflow configuration
// Return the YAML content as a string
function createBasicWorkflow(): string {
  // TODO: Return YAML configuration string
  return \`\`;
}`,
    solution: `function createBasicWorkflow(): string {
  return \`name: CI

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test\`;
}`,
    testCases: [
      { input: 'const yaml = createBasicWorkflow(); console.log(yaml.includes("npm install") && yaml.includes("npm test"))', isHidden: false, description: 'Includes npm commands' },
      { input: 'const yaml = createBasicWorkflow(); console.log(yaml.includes("on:") && yaml.includes("push:"))', isHidden: false, description: 'Has push trigger' },
      { input: 'const yaml = createBasicWorkflow(); console.log(yaml.includes("ubuntu-latest"))', isHidden: true, description: 'Uses Ubuntu runner' },
    ],
    hints: [
      'Use YAML syntax with proper indentation',
      'Start with name and on triggers',
      'Define jobs with runs-on and steps',
      'Use actions/checkout to get the code',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex02',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Health Check Endpoint',
    difficulty: 1,
    description: 'Create a health check endpoint function that returns status "ok" and the current timestamp.',
    starterCode: `interface HealthCheckResponse {
  status: string;
  timestamp: number;
}

function healthCheck(): HealthCheckResponse {
  // TODO: Return health check response
}`,
    solution: `interface HealthCheckResponse {
  status: string;
  timestamp: number;
}

function healthCheck(): HealthCheckResponse {
  return {
    status: 'ok',
    timestamp: Date.now(),
  };
}`,
    testCases: [
      { input: 'const result = healthCheck(); console.log(result.status === "ok")', isHidden: false, description: 'Status is ok' },
      { input: 'const result = healthCheck(); console.log(typeof result.timestamp === "number")', isHidden: false, description: 'Timestamp is a number' },
      { input: 'const r1 = healthCheck(); const r2 = healthCheck(); console.log(r2.timestamp >= r1.timestamp)', isHidden: true, description: 'Timestamp updates' },
    ],
    hints: [
      'Return an object with status and timestamp',
      'Use Date.now() for current timestamp',
      'Status should be "ok" when healthy',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex03',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Environment Variable Parser',
    difficulty: 1,
    description: 'Create a function that parses environment variables from a .env file format string and returns them as an object.',
    starterCode: `function parseEnvFile(content: string): Record<string, string> {
  // TODO: Parse KEY=VALUE lines into object
}`,
    solution: `function parseEnvFile(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split('\\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      result[key.trim()] = valueParts.join('=').trim();
    }
  }

  return result;
}`,
    testCases: [
      { input: 'const env = parseEnvFile("PORT=3000\\nHOST=localhost"); console.log(env.PORT === "3000" && env.HOST === "localhost")', isHidden: false, description: 'Parses basic key-value pairs' },
      { input: 'const env = parseEnvFile("# Comment\\nKEY=value"); console.log(Object.keys(env).length === 1)', isHidden: false, description: 'Ignores comments' },
      { input: 'const env = parseEnvFile("URL=http://example.com"); console.log(env.URL === "http://example.com")', isHidden: true, description: 'Handles values with =' },
    ],
    hints: [
      'Split content by newlines',
      'Skip empty lines and comments (starting with #)',
      'Split each line by = to get key and value',
      'Handle values that contain = character',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex04',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'CI Pipeline with Multiple Stages',
    difficulty: 2,
    description: 'Create a function that generates a GitHub Actions workflow with separate lint, test, and build stages that run in sequence.',
    starterCode: `function createMultiStageWorkflow(): string {
  // TODO: Create workflow with lint, test, build stages
  return \`\`;
}`,
    solution: `function createMultiStageWorkflow(): string {
  return \`name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint

  test:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build\`;
}`,
    testCases: [
      { input: 'const yaml = createMultiStageWorkflow(); console.log(yaml.includes("lint") && yaml.includes("test") && yaml.includes("build"))', isHidden: false, description: 'Has all three stages' },
      { input: 'const yaml = createMultiStageWorkflow(); console.log(yaml.includes("needs:"))', isHidden: false, description: 'Uses needs for sequencing' },
      { input: 'const yaml = createMultiStageWorkflow(); console.log(yaml.includes("pull_request"))', isHidden: true, description: 'Runs on PRs' },
    ],
    hints: [
      'Create separate jobs for lint, test, and build',
      'Use needs keyword to create dependencies between jobs',
      'Each job should checkout code and setup Node.js',
      'Run appropriate npm commands in each job',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex05',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Basic Dockerfile Generator',
    difficulty: 2,
    description: 'Create a function that generates a Dockerfile for a Node.js application with proper multi-stage build.',
    starterCode: `function generateDockerfile(nodeVersion: string = '18'): string {
  // TODO: Generate Dockerfile content
  return \`\`;
}`,
    solution: `function generateDockerfile(nodeVersion: string = '18'): string {
  return \`FROM node:\${nodeVersion}-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:\${nodeVersion}-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]\`;
}`,
    testCases: [
      { input: 'const df = generateDockerfile(); console.log(df.includes("FROM node:") && df.includes("WORKDIR"))', isHidden: false, description: 'Has FROM and WORKDIR' },
      { input: 'const df = generateDockerfile("16"); console.log(df.includes("node:16"))', isHidden: false, description: 'Uses specified version' },
      { input: 'const df = generateDockerfile(); console.log(df.includes("COPY --from=builder"))', isHidden: true, description: 'Multi-stage build' },
    ],
    hints: [
      'Use multi-stage build with AS builder',
      'Copy package.json first for layer caching',
      'Run npm ci for reproducible builds',
      'Copy build artifacts from builder stage',
      'Use --production for final image',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex06',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Structured Logger',
    difficulty: 2,
    description: 'Create a structured logger that outputs JSON-formatted logs with timestamp, level, message, and metadata.',
    starterCode: `interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  metadata?: Record<string, any>;
}

class StructuredLogger {
  log(level: string, message: string, metadata?: Record<string, any>): string {
    // TODO: Create and return JSON log entry
  }

  info(message: string, metadata?: Record<string, any>): string {
    // TODO: Log at info level
  }

  error(message: string, metadata?: Record<string, any>): string {
    // TODO: Log at error level
  }
}`,
    solution: `interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  metadata?: Record<string, any>;
}

class StructuredLogger {
  log(level: string, message: string, metadata?: Record<string, any>): string {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (metadata && Object.keys(metadata).length > 0) {
      entry.metadata = metadata;
    }

    return JSON.stringify(entry);
  }

  info(message: string, metadata?: Record<string, any>): string {
    return this.log('info', message, metadata);
  }

  error(message: string, metadata?: Record<string, any>): string {
    return this.log('error', message, metadata);
  }
}`,
    testCases: [
      { input: 'const logger = new StructuredLogger(); const log = JSON.parse(logger.info("test")); console.log(log.level === "info" && log.message === "test")', isHidden: false, description: 'Logs info messages' },
      { input: 'const logger = new StructuredLogger(); const log = JSON.parse(logger.error("err", {code: 500})); console.log(log.metadata.code === 500)', isHidden: false, description: 'Includes metadata' },
      { input: 'const logger = new StructuredLogger(); const log = JSON.parse(logger.log("warn", "msg")); console.log(log.timestamp && log.level)', isHidden: true, description: 'Has timestamp and level' },
    ],
    hints: [
      'Create log entry object with required fields',
      'Use new Date().toISOString() for timestamp',
      'Only include metadata if provided',
      'Return JSON.stringify of the entry',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex07',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Docker Compose Configuration',
    difficulty: 3,
    description: 'Create a function that generates a docker-compose.yml for an app with web service and PostgreSQL database.',
    starterCode: `function generateDockerCompose(): string {
  // TODO: Generate docker-compose.yml content
  return \`\`;
}`,
    solution: `function generateDockerCompose(): string {
  return \`version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/myapp
      - NODE_ENV=production
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:\`;
}`,
    testCases: [
      { input: 'const dc = generateDockerCompose(); console.log(dc.includes("services:") && dc.includes("web:") && dc.includes("db:"))', isHidden: false, description: 'Has services section' },
      { input: 'const dc = generateDockerCompose(); console.log(dc.includes("depends_on"))', isHidden: false, description: 'Web depends on db' },
      { input: 'const dc = generateDockerCompose(); console.log(dc.includes("volumes:") && dc.includes("postgres_data"))', isHidden: true, description: 'Has persistent volumes' },
    ],
    hints: [
      'Use version 3.8 for docker-compose',
      'Define web and db services',
      'Web service should depend_on db',
      'Use environment variables for database connection',
      'Create named volume for database persistence',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex08',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Environment-Aware Configuration',
    difficulty: 3,
    description: 'Create a configuration manager that loads different settings based on NODE_ENV (development, staging, production).',
    starterCode: `interface Config {
  environment: string;
  port: number;
  databaseUrl: string;
  logLevel: string;
  enableDebug: boolean;
}

class ConfigManager {
  getConfig(env: string): Config {
    // TODO: Return environment-specific config
  }
}`,
    solution: `interface Config {
  environment: string;
  port: number;
  databaseUrl: string;
  logLevel: string;
  enableDebug: boolean;
}

class ConfigManager {
  getConfig(env: string): Config {
    const baseConfig = {
      environment: env,
    };

    switch (env) {
      case 'production':
        return {
          ...baseConfig,
          port: 80,
          databaseUrl: process.env.DATABASE_URL || 'postgres://prod-db:5432/app',
          logLevel: 'error',
          enableDebug: false,
        };

      case 'staging':
        return {
          ...baseConfig,
          port: 3000,
          databaseUrl: process.env.DATABASE_URL || 'postgres://staging-db:5432/app',
          logLevel: 'warn',
          enableDebug: true,
        };

      case 'development':
      default:
        return {
          ...baseConfig,
          port: 3000,
          databaseUrl: 'postgres://localhost:5432/app_dev',
          logLevel: 'debug',
          enableDebug: true,
        };
    }
  }
}`,
    testCases: [
      { input: 'const cm = new ConfigManager(); const cfg = cm.getConfig("production"); console.log(cfg.enableDebug === false && cfg.logLevel === "error")', isHidden: false, description: 'Production disables debug' },
      { input: 'const cm = new ConfigManager(); const cfg = cm.getConfig("development"); console.log(cfg.enableDebug === true && cfg.logLevel === "debug")', isHidden: false, description: 'Development enables debug' },
      { input: 'const cm = new ConfigManager(); const cfg = cm.getConfig("staging"); console.log(cfg.port === 3000 && cfg.logLevel === "warn")', isHidden: true, description: 'Staging config' },
    ],
    hints: [
      'Use switch statement for different environments',
      'Production should have minimal logging and no debug',
      'Development should have verbose logging',
      'Allow environment variable overrides',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex09',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Metric Collector',
    difficulty: 3,
    description: 'Create a metric collector that tracks request count, response times, and calculates average response time.',
    starterCode: `interface Metrics {
  requestCount: number;
  totalResponseTime: number;
  averageResponseTime: number;
  errors: number;
}

class MetricCollector {
  private requestCount = 0;
  private totalResponseTime = 0;
  private errors = 0;

  recordRequest(responseTimeMs: number, isError: boolean = false): void {
    // TODO: Record metrics
  }

  getMetrics(): Metrics {
    // TODO: Return current metrics
  }

  reset(): void {
    // TODO: Reset all metrics
  }
}`,
    solution: `interface Metrics {
  requestCount: number;
  totalResponseTime: number;
  averageResponseTime: number;
  errors: number;
}

class MetricCollector {
  private requestCount = 0;
  private totalResponseTime = 0;
  private errors = 0;

  recordRequest(responseTimeMs: number, isError: boolean = false): void {
    this.requestCount++;
    this.totalResponseTime += responseTimeMs;
    if (isError) {
      this.errors++;
    }
  }

  getMetrics(): Metrics {
    return {
      requestCount: this.requestCount,
      totalResponseTime: this.totalResponseTime,
      averageResponseTime: this.requestCount > 0
        ? this.totalResponseTime / this.requestCount
        : 0,
      errors: this.errors,
    };
  }

  reset(): void {
    this.requestCount = 0;
    this.totalResponseTime = 0;
    this.errors = 0;
  }
}`,
    testCases: [
      { input: 'const mc = new MetricCollector(); mc.recordRequest(100); mc.recordRequest(200); const m = mc.getMetrics(); console.log(m.requestCount === 2 && m.averageResponseTime === 150)', isHidden: false, description: 'Tracks requests and average' },
      { input: 'const mc = new MetricCollector(); mc.recordRequest(100, true); const m = mc.getMetrics(); console.log(m.errors === 1)', isHidden: false, description: 'Counts errors' },
      { input: 'const mc = new MetricCollector(); mc.recordRequest(100); mc.reset(); const m = mc.getMetrics(); console.log(m.requestCount === 0)', isHidden: true, description: 'Reset clears metrics' },
    ],
    hints: [
      'Increment counters in recordRequest',
      'Track total response time for average calculation',
      'Average = total / count (handle division by zero)',
      'Reset should clear all private fields',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex10',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Vercel Deployment Configuration',
    difficulty: 3,
    description: 'Create a function that generates a vercel.json configuration file with redirects, headers, and environment variables.',
    starterCode: `function generateVercelConfig(): string {
  // TODO: Generate vercel.json configuration
  return \`\`;
}`,
    solution: `function generateVercelConfig(): string {
  const config = {
    version: 2,
    builds: [
      {
        src: 'package.json',
        use: '@vercel/node',
      },
    ],
    routes: [
      {
        src: '/api/(.*)',
        dest: '/api/$1',
      },
      {
        src: '/(.*)',
        dest: '/$1',
      },
    ],
    headers: [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ],
    env: {
      NODE_ENV: 'production',
    },
  };

  return JSON.stringify(config, null, 2);
}`,
    testCases: [
      { input: 'const cfg = JSON.parse(generateVercelConfig()); console.log(cfg.version === 2 && cfg.builds)', isHidden: false, description: 'Has version and builds' },
      { input: 'const cfg = JSON.parse(generateVercelConfig()); console.log(cfg.headers && cfg.headers.length > 0)', isHidden: false, description: 'Includes security headers' },
      { input: 'const cfg = JSON.parse(generateVercelConfig()); console.log(cfg.env.NODE_ENV === "production")', isHidden: true, description: 'Sets NODE_ENV' },
    ],
    hints: [
      'Use version 2 of Vercel config',
      'Define builds with @vercel/node',
      'Add security headers (X-Frame-Options, etc.)',
      'Set up routing for API and static files',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex11',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Database Backup Script Generator',
    difficulty: 4,
    description: 'Create a function that generates a PostgreSQL backup script with compression and timestamped filenames.',
    starterCode: `interface BackupConfig {
  host: string;
  database: string;
  user: string;
  backupDir: string;
}

function generateBackupScript(config: BackupConfig): string {
  // TODO: Generate backup shell script
  return \`\`;
}`,
    solution: `interface BackupConfig {
  host: string;
  database: string;
  user: string;
  backupDir: string;
}

function generateBackupScript(config: BackupConfig): string {
  return \`#!/bin/bash

# PostgreSQL Backup Script
# Generated: \${new Date().toISOString()}

set -e

BACKUP_DIR="\${config.backupDir}"
TIMESTAMP=\$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\${BACKUP_DIR}/\${config.database}_\${TIMESTAMP}.sql.gz"

# Create backup directory if it doesn't exist
mkdir -p "\${BACKUP_DIR}"

# Perform backup
echo "Starting backup of \${config.database}..."
pg_dump -h \${config.host} -U \${config.user} -d \${config.database} | gzip > "\${BACKUP_FILE}"

# Verify backup
if [ -f "\${BACKUP_FILE}" ]; then
  SIZE=\$(du -h "\${BACKUP_FILE}" | cut -f1)
  echo "Backup completed: \${BACKUP_FILE} (\${SIZE})"
else
  echo "Backup failed!" >&2
  exit 1
fi

# Remove backups older than 30 days
find "\${BACKUP_DIR}" -name "*.sql.gz" -mtime +30 -delete
echo "Old backups cleaned up"

exit 0\`;
}`,
    testCases: [
      { input: 'const script = generateBackupScript({host: "localhost", database: "mydb", user: "admin", backupDir: "/backups"}); console.log(script.includes("pg_dump") && script.includes("gzip"))', isHidden: false, description: 'Uses pg_dump with compression' },
      { input: 'const script = generateBackupScript({host: "db.example.com", database: "prod", user: "backup", backupDir: "/data"}); console.log(script.includes("TIMESTAMP"))', isHidden: false, description: 'Includes timestamp in filename' },
      { input: 'const script = generateBackupScript({host: "localhost", database: "test", user: "user", backupDir: "/tmp"}); console.log(script.includes("mtime +30"))', isHidden: true, description: 'Cleans up old backups' },
    ],
    hints: [
      'Start with #!/bin/bash shebang',
      'Use date command for timestamp',
      'Pipe pg_dump output to gzip',
      'Add error checking and cleanup of old files',
      'Use set -e to exit on error',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex12',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Feature Flag System',
    difficulty: 4,
    description: 'Create a feature flag system that can enable/disable features based on environment and user percentage rollout.',
    starterCode: `interface FeatureFlag {
  name: string;
  enabled: boolean;
  environments: string[];
  rolloutPercentage: number;
}

class FeatureFlagManager {
  private flags: Map<string, FeatureFlag> = new Map();

  addFlag(flag: FeatureFlag): void {
    // TODO: Add feature flag
  }

  isEnabled(flagName: string, environment: string, userId?: string): boolean {
    // TODO: Check if feature is enabled
  }

  private hashUserId(userId: string): number {
    // TODO: Simple hash function for consistent rollout
  }
}`,
    solution: `interface FeatureFlag {
  name: string;
  enabled: boolean;
  environments: string[];
  rolloutPercentage: number;
}

class FeatureFlagManager {
  private flags: Map<string, FeatureFlag> = new Map();

  addFlag(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag);
  }

  isEnabled(flagName: string, environment: string, userId?: string): boolean {
    const flag = this.flags.get(flagName);

    if (!flag) {
      return false;
    }

    if (!flag.enabled) {
      return false;
    }

    if (!flag.environments.includes(environment)) {
      return false;
    }

    // Check rollout percentage
    if (flag.rolloutPercentage < 100 && userId) {
      const hash = this.hashUserId(userId);
      const userPercentage = hash % 100;
      return userPercentage < flag.rolloutPercentage;
    }

    return flag.rolloutPercentage === 100;
  }

  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}`,
    testCases: [
      { input: 'const fm = new FeatureFlagManager(); fm.addFlag({name: "new-ui", enabled: true, environments: ["production"], rolloutPercentage: 100}); console.log(fm.isEnabled("new-ui", "production"))', isHidden: false, description: '100% rollout enabled' },
      { input: 'const fm = new FeatureFlagManager(); fm.addFlag({name: "beta", enabled: true, environments: ["staging"], rolloutPercentage: 100}); console.log(!fm.isEnabled("beta", "production"))', isHidden: false, description: 'Environment restrictions work' },
      { input: 'const fm = new FeatureFlagManager(); fm.addFlag({name: "test", enabled: false, environments: ["production"], rolloutPercentage: 100}); console.log(!fm.isEnabled("test", "production"))', isHidden: true, description: 'Disabled flags return false' },
    ],
    hints: [
      'Check if flag exists and is enabled',
      'Verify environment is in allowed list',
      'For percentage rollout, hash userId consistently',
      'Return true only if all conditions pass',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex13',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Rollback Strategy Manager',
    difficulty: 4,
    description: 'Create a deployment rollback manager that tracks versions and can rollback to previous stable version.',
    starterCode: `interface Deployment {
  version: string;
  timestamp: number;
  status: 'success' | 'failed' | 'rolled-back';
  healthCheckPassed: boolean;
}

class RollbackManager {
  private deployments: Deployment[] = [];

  recordDeployment(version: string, healthCheckPassed: boolean): void {
    // TODO: Record deployment
  }

  shouldRollback(): boolean {
    // TODO: Determine if rollback needed
  }

  rollback(): string | null {
    // TODO: Perform rollback to last stable version
  }

  getCurrentVersion(): string | null {
    // TODO: Get current deployed version
  }
}`,
    solution: `interface Deployment {
  version: string;
  timestamp: number;
  status: 'success' | 'failed' | 'rolled-back';
  healthCheckPassed: boolean;
}

class RollbackManager {
  private deployments: Deployment[] = [];

  recordDeployment(version: string, healthCheckPassed: boolean): void {
    const deployment: Deployment = {
      version,
      timestamp: Date.now(),
      status: healthCheckPassed ? 'success' : 'failed',
      healthCheckPassed,
    };
    this.deployments.push(deployment);
  }

  shouldRollback(): boolean {
    if (this.deployments.length === 0) {
      return false;
    }

    const latest = this.deployments[this.deployments.length - 1];
    return !latest.healthCheckPassed;
  }

  rollback(): string | null {
    if (this.deployments.length < 2) {
      return null;
    }

    // Mark current as rolled back
    const current = this.deployments[this.deployments.length - 1];
    current.status = 'rolled-back';

    // Find last successful deployment
    for (let i = this.deployments.length - 2; i >= 0; i--) {
      if (this.deployments[i].status === 'success' && this.deployments[i].healthCheckPassed) {
        return this.deployments[i].version;
      }
    }

    return null;
  }

  getCurrentVersion(): string | null {
    if (this.deployments.length === 0) {
      return null;
    }

    // Find the most recent non-rolled-back deployment
    for (let i = this.deployments.length - 1; i >= 0; i--) {
      if (this.deployments[i].status !== 'rolled-back') {
        return this.deployments[i].version;
      }
    }

    return null;
  }
}`,
    testCases: [
      { input: 'const rm = new RollbackManager(); rm.recordDeployment("v1.0", true); rm.recordDeployment("v1.1", false); console.log(rm.shouldRollback())', isHidden: false, description: 'Detects failed deployment' },
      { input: 'const rm = new RollbackManager(); rm.recordDeployment("v1.0", true); rm.recordDeployment("v1.1", false); const prev = rm.rollback(); console.log(prev === "v1.0")', isHidden: false, description: 'Rolls back to stable version' },
      { input: 'const rm = new RollbackManager(); rm.recordDeployment("v1.0", true); console.log(rm.getCurrentVersion() === "v1.0")', isHidden: true, description: 'Tracks current version' },
    ],
    hints: [
      'Store deployments in chronological order',
      'Track health check results',
      'Rollback should find last successful deployment',
      'Mark rolled-back deployments appropriately',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex14',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Blue-Green Deployment Router',
    difficulty: 5,
    description: 'Create a blue-green deployment router that can switch traffic between two environments and handle gradual migration.',
    starterCode: `interface Environment {
  name: 'blue' | 'green';
  version: string;
  healthy: boolean;
}

class BlueGreenRouter {
  private blue: Environment;
  private green: Environment;
  private activeEnvironment: 'blue' | 'green' = 'blue';
  private trafficSplit: number = 100; // Percentage to active

  constructor() {
    this.blue = { name: 'blue', version: '0.0.0', healthy: true };
    this.green = { name: 'green', version: '0.0.0', healthy: true };
  }

  deployToInactive(version: string): 'blue' | 'green' {
    // TODO: Deploy to inactive environment
  }

  switchTraffic(percentage: number): void {
    // TODO: Gradually shift traffic (0-100)
  }

  completeSwitch(): void {
    // TODO: Complete switch to new environment
  }

  routeRequest(requestId: string): 'blue' | 'green' {
    // TODO: Route request based on traffic split
  }

  getStatus(): { active: string; version: string; split: number } {
    // TODO: Return current status
  }
}`,
    solution: `interface Environment {
  name: 'blue' | 'green';
  version: string;
  healthy: boolean;
}

class BlueGreenRouter {
  private blue: Environment;
  private green: Environment;
  private activeEnvironment: 'blue' | 'green' = 'blue';
  private trafficSplit: number = 100; // Percentage to active

  constructor() {
    this.blue = { name: 'blue', version: '0.0.0', healthy: true };
    this.green = { name: 'green', version: '0.0.0', healthy: true };
  }

  deployToInactive(version: string): 'blue' | 'green' {
    const inactive = this.activeEnvironment === 'blue' ? 'green' : 'blue';
    const env = inactive === 'blue' ? this.blue : this.green;
    env.version = version;
    env.healthy = true;
    return inactive;
  }

  switchTraffic(percentage: number): void {
    // Clamp percentage between 0 and 100
    this.trafficSplit = Math.max(0, Math.min(100, percentage));
  }

  completeSwitch(): void {
    // Switch active environment
    this.activeEnvironment = this.activeEnvironment === 'blue' ? 'green' : 'blue';
    this.trafficSplit = 100;
  }

  routeRequest(requestId: string): 'blue' | 'green' {
    if (this.trafficSplit === 100) {
      return this.activeEnvironment;
    }

    if (this.trafficSplit === 0) {
      return this.activeEnvironment === 'blue' ? 'green' : 'blue';
    }

    // Hash request ID for consistent routing
    let hash = 0;
    for (let i = 0; i < requestId.length; i++) {
      hash = ((hash << 5) - hash) + requestId.charCodeAt(i);
      hash = hash & hash;
    }

    const percentage = Math.abs(hash) % 100;

    if (percentage < this.trafficSplit) {
      return this.activeEnvironment;
    } else {
      return this.activeEnvironment === 'blue' ? 'green' : 'blue';
    }
  }

  getStatus(): { active: string; version: string; split: number } {
    const activeEnv = this.activeEnvironment === 'blue' ? this.blue : this.green;
    return {
      active: this.activeEnvironment,
      version: activeEnv.version,
      split: this.trafficSplit,
    };
  }
}`,
    testCases: [
      { input: 'const router = new BlueGreenRouter(); const inactive = router.deployToInactive("v2.0"); console.log(inactive === "green")', isHidden: false, description: 'Deploys to inactive env' },
      { input: 'const router = new BlueGreenRouter(); router.switchTraffic(50); const status = router.getStatus(); console.log(status.split === 50)', isHidden: false, description: 'Splits traffic' },
      { input: 'const router = new BlueGreenRouter(); router.deployToInactive("v2.0"); router.completeSwitch(); console.log(router.getStatus().active === "green")', isHidden: true, description: 'Completes switch' },
    ],
    hints: [
      'Track which environment is active',
      'Deploy new version to inactive environment',
      'Use traffic split percentage for gradual migration',
      'Hash request ID for consistent routing',
      'Complete switch changes active environment',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex15',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'SSL/TLS Configuration Validator',
    difficulty: 5,
    description: 'Create an SSL/TLS configuration validator that checks certificate expiry, protocols, and cipher suites.',
    starterCode: `interface SSLConfig {
  certificateExpiry: Date;
  protocols: string[];
  cipherSuites: string[];
  httpsOnly: boolean;
  hsts: boolean;
}

interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

class SSLValidator {
  private readonly SECURE_PROTOCOLS = ['TLSv1.2', 'TLSv1.3'];
  private readonly INSECURE_CIPHERS = ['RC4', 'MD5', 'DES', '3DES'];

  validate(config: SSLConfig): ValidationResult {
    // TODO: Validate SSL configuration
  }

  private checkCertificateExpiry(expiry: Date): { error?: string; warning?: string } {
    // TODO: Check certificate expiration
  }

  private checkProtocols(protocols: string[]): { errors: string[]; warnings: string[] } {
    // TODO: Check TLS protocols
  }

  private checkCiphers(cipherSuites: string[]): { errors: string[]; warnings: string[] } {
    // TODO: Check cipher suites
  }
}`,
    solution: `interface SSLConfig {
  certificateExpiry: Date;
  protocols: string[];
  cipherSuites: string[];
  httpsOnly: boolean;
  hsts: boolean;
}

interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

class SSLValidator {
  private readonly SECURE_PROTOCOLS = ['TLSv1.2', 'TLSv1.3'];
  private readonly INSECURE_CIPHERS = ['RC4', 'MD5', 'DES', '3DES'];

  validate(config: SSLConfig): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Check certificate expiry
    const expiryCheck = this.checkCertificateExpiry(config.certificateExpiry);
    if (expiryCheck.error) errors.push(expiryCheck.error);
    if (expiryCheck.warning) warnings.push(expiryCheck.warning);

    // Check protocols
    const protocolCheck = this.checkProtocols(config.protocols);
    errors.push(...protocolCheck.errors);
    warnings.push(...protocolCheck.warnings);

    // Check ciphers
    const cipherCheck = this.checkCiphers(config.cipherSuites);
    errors.push(...cipherCheck.errors);
    warnings.push(...cipherCheck.warnings);

    // Check HTTPS and HSTS
    if (!config.httpsOnly) {
      errors.push('HTTPS-only mode is not enabled');
    }

    if (!config.hsts) {
      warnings.push('HSTS header is not enabled');
    }

    return {
      valid: errors.length === 0,
      warnings,
      errors,
    };
  }

  private checkCertificateExpiry(expiry: Date): { error?: string; warning?: string } {
    const now = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { error: 'Certificate has expired' };
    }

    if (daysUntilExpiry < 30) {
      return { warning: \`Certificate expires in \${daysUntilExpiry} days\` };
    }

    return {};
  }

  private checkProtocols(protocols: string[]): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (protocols.length === 0) {
      errors.push('No TLS protocols configured');
      return { errors, warnings };
    }

    const hasSecureProtocol = protocols.some(p => this.SECURE_PROTOCOLS.includes(p));
    if (!hasSecureProtocol) {
      errors.push('No secure TLS protocol (TLSv1.2 or TLSv1.3) enabled');
    }

    const insecureProtocols = protocols.filter(p => !this.SECURE_PROTOCOLS.includes(p));
    if (insecureProtocols.length > 0) {
      warnings.push(\`Insecure protocols enabled: \${insecureProtocols.join(', ')}\`);
    }

    return { errors, warnings };
  }

  private checkCiphers(cipherSuites: string[]): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (cipherSuites.length === 0) {
      errors.push('No cipher suites configured');
      return { errors, warnings };
    }

    const insecureCiphers = cipherSuites.filter(cipher =>
      this.INSECURE_CIPHERS.some(insecure => cipher.includes(insecure))
    );

    if (insecureCiphers.length > 0) {
      errors.push(\`Insecure ciphers detected: \${insecureCiphers.join(', ')}\`);
    }

    return { errors, warnings };
  }
}`,
    testCases: [
      { input: 'const validator = new SSLValidator(); const result = validator.validate({certificateExpiry: new Date(Date.now() - 1000), protocols: ["TLSv1.2"], cipherSuites: ["AES256"], httpsOnly: true, hsts: true}); console.log(!result.valid && result.errors.some(e => e.includes("expired")))', isHidden: false, description: 'Detects expired certificate' },
      { input: 'const validator = new SSLValidator(); const result = validator.validate({certificateExpiry: new Date(Date.now() + 100000000), protocols: ["TLSv1.0"], cipherSuites: ["AES256"], httpsOnly: true, hsts: true}); console.log(result.warnings.some(w => w.includes("Insecure")))', isHidden: false, description: 'Warns about insecure protocols' },
      { input: 'const validator = new SSLValidator(); const result = validator.validate({certificateExpiry: new Date(Date.now() + 100000000), protocols: ["TLSv1.3"], cipherSuites: ["RC4-SHA"], httpsOnly: true, hsts: true}); console.log(!result.valid && result.errors.some(e => e.includes("cipher")))', isHidden: true, description: 'Detects insecure ciphers' },
    ],
    hints: [
      'Check certificate expiry date against current time',
      'Validate TLS protocols (1.2 and 1.3 are secure)',
      'Check for insecure ciphers (RC4, MD5, DES)',
      'Verify HTTPS-only and HSTS settings',
      'Separate errors (must fix) from warnings (should fix)',
    ],
    language: 'typescript',
  },
  {
    id: 'cs404-t6-ex16',
    subjectId: 'cs404',
    topicId: 'topic-6',
    title: 'Production Readiness Checklist',
    difficulty: 5,
    description: 'Create a production readiness checker that validates all deployment requirements are met before going live.',
    starterCode: `interface ChecklistItem {
  category: string;
  item: string;
  required: boolean;
  checked: boolean;
}

interface ReadinessReport {
  ready: boolean;
  completionPercentage: number;
  categories: {
    [category: string]: {
      total: number;
      completed: number;
      blocking: number;
    };
  };
  blockers: string[];
}

class ProductionReadinessChecker {
  private checklist: ChecklistItem[] = [];

  addItem(category: string, item: string, required: boolean = true): void {
    // TODO: Add checklist item
  }

  checkItem(category: string, item: string): void {
    // TODO: Mark item as checked
  }

  getReport(): ReadinessReport {
    // TODO: Generate readiness report
  }

  isReady(): boolean {
    // TODO: Check if all required items are complete
  }
}`,
    solution: `interface ChecklistItem {
  category: string;
  item: string;
  required: boolean;
  checked: boolean;
}

interface ReadinessReport {
  ready: boolean;
  completionPercentage: number;
  categories: {
    [category: string]: {
      total: number;
      completed: number;
      blocking: number;
    };
  };
  blockers: string[];
}

class ProductionReadinessChecker {
  private checklist: ChecklistItem[] = [];

  addItem(category: string, item: string, required: boolean = true): void {
    this.checklist.push({
      category,
      item,
      required,
      checked: false,
    });
  }

  checkItem(category: string, item: string): void {
    const checklistItem = this.checklist.find(
      i => i.category === category && i.item === item
    );

    if (checklistItem) {
      checklistItem.checked = true;
    }
  }

  getReport(): ReadinessReport {
    const categories: ReadinessReport['categories'] = {};
    const blockers: string[] = [];

    // Group by category
    for (const item of this.checklist) {
      if (!categories[item.category]) {
        categories[item.category] = {
          total: 0,
          completed: 0,
          blocking: 0,
        };
      }

      categories[item.category].total++;

      if (item.checked) {
        categories[item.category].completed++;
      } else if (item.required) {
        categories[item.category].blocking++;
        blockers.push(\`[\${item.category}] \${item.item}\`);
      }
    }

    // Calculate completion percentage
    const totalItems = this.checklist.length;
    const completedItems = this.checklist.filter(i => i.checked).length;
    const completionPercentage = totalItems > 0
      ? Math.round((completedItems / totalItems) * 100)
      : 0;

    // Check if ready (all required items complete)
    const ready = this.isReady();

    return {
      ready,
      completionPercentage,
      categories,
      blockers,
    };
  }

  isReady(): boolean {
    return this.checklist
      .filter(item => item.required)
      .every(item => item.checked);
  }
}`,
    testCases: [
      { input: 'const checker = new ProductionReadinessChecker(); checker.addItem("Security", "SSL configured", true); checker.addItem("Security", "CORS configured", true); checker.checkItem("Security", "SSL configured"); console.log(!checker.isReady())', isHidden: false, description: 'Not ready with unchecked required items' },
      { input: 'const checker = new ProductionReadinessChecker(); checker.addItem("Monitoring", "Logs configured", true); checker.checkItem("Monitoring", "Logs configured"); const report = checker.getReport(); console.log(report.ready && report.completionPercentage === 100)', isHidden: false, description: 'Ready when all items checked' },
      { input: 'const checker = new ProductionReadinessChecker(); checker.addItem("Performance", "CDN", false); checker.addItem("Security", "SSL", true); checker.checkItem("Security", "SSL"); console.log(checker.isReady())', isHidden: true, description: 'Optional items do not block' },
    ],
    hints: [
      'Store checklist items with category, name, required flag, and checked status',
      'Group items by category for reporting',
      'Track blocking items (required but not checked)',
      'Calculate completion percentage across all items',
      'Ready = all required items are checked',
    ],
    language: 'typescript',
  },
];
