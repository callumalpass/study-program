---
title: "Chaos Engineering"
description: "Chaos Monkey, game days, failure injection, and observability practices for building resilient distributed systems"
---

# Chaos Engineering

Chaos Engineering is the discipline of experimenting on a distributed system to build confidence in its capability to withstand turbulent conditions in production. Rather than waiting for failures to occur naturally, chaos engineering proactively introduces controlled failures to uncover weaknesses before they cause outages. This approach, pioneered by Netflix, has become essential for building truly resilient distributed systems.

## Principles of Chaos Engineering

Chaos engineering follows a scientific methodology to understand system behavior under stress.

### The Chaos Engineering Methodology

1. **Define steady state** - Establish baseline metrics for normal system behavior
2. **Hypothesize** - Predict how the system will behave under specific failure conditions
3. **Introduce variables** - Inject failures into the production environment
4. **Try to disprove hypothesis** - Monitor whether the system maintains steady state
5. **Minimize blast radius** - Start small and gradually increase scope

```javascript
class ChaosExperiment {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.hypothesis = null;
    this.steadyState = null;
    this.failures = [];
    this.results = [];
  }

  defineStead

yState(metrics, thresholds) {
    this.steadyState = {
      metrics,          // e.g., ['latency_p99', 'error_rate', 'throughput']
      thresholds,       // e.g., { latency_p99: 100, error_rate: 0.01 }
      validate: async () => {
        const current = await this.measureMetrics(metrics);

        for (const [metric, threshold] of Object.entries(thresholds)) {
          if (current[metric] > threshold) {
            return {
              valid: false,
              metric,
              current: current[metric],
              threshold
            };
          }
        }

        return { valid: true };
      }
    };
  }

  hypothesize(description) {
    this.hypothesis = description;
    console.log(`Hypothesis: ${description}`);
  }

  addFailure(failureInjector) {
    this.failures.push(failureInjector);
  }

  async run() {
    console.log(`\n=== Chaos Experiment: ${this.name} ===`);
    console.log(`Hypothesis: ${this.hypothesis}`);

    // Step 1: Verify steady state before experiment
    const beforeState = await this.steadyState.validate();
    if (!beforeState.valid) {
      throw new Error(`System not in steady state before experiment: ${JSON.stringify(beforeState)}`);
    }

    console.log('✓ System in steady state');

    // Step 2: Inject failures
    console.log('\nInjecting failures...');
    const activeFailures = [];

    for (const failure of this.failures) {
      const handle = await failure.inject();
      activeFailures.push(handle);
      console.log(`  - ${failure.description}`);
    }

    // Step 3: Monitor system behavior
    console.log('\nMonitoring system behavior...');
    const monitoringDuration = 300000;  // 5 minutes
    const checkInterval = 10000;        // 10 seconds
    const samples = [];

    const startTime = Date.now();
    while (Date.now() - startTime < monitoringDuration) {
      const state = await this.steadyState.validate();
      samples.push({
        timestamp: Date.now(),
        state
      });

      if (!state.valid) {
        console.log(`⚠ Steady state violated: ${state.metric} = ${state.current} (threshold: ${state.threshold})`);
      }

      await this.sleep(checkInterval);
    }

    // Step 4: Remove failures
    console.log('\nRemoving failures...');
    for (const handle of activeFailures) {
      await handle.remove();
    }

    // Step 5: Verify recovery
    console.log('Verifying system recovery...');
    await this.sleep(30000);  // Wait 30s for recovery

    const afterState = await this.steadyState.validate();

    // Step 6: Analyze results
    const result = this.analyzeResults(samples, afterState);

    this.results.push({
      timestamp: Date.now(),
      hypothesis: this.hypothesis,
      result
    });

    console.log(`\n=== Experiment Complete ===`);
    console.log(`Result: ${result.success ? 'PASS' : 'FAIL'}`);
    console.log(`Summary: ${result.summary}`);

    return result;
  }

  analyzeResults(samples, finalState) {
    const violations = samples.filter(s => !s.state.valid);
    const violationRate = violations.length / samples.length;

    return {
      success: finalState.valid && violationRate < 0.1,  // Allow up to 10% transient violations
      violationRate,
      violations: violations.length,
      totalSamples: samples.length,
      recovered: finalState.valid,
      summary: `System ${finalState.valid ? 'recovered' : 'did not recover'} after failures. ` +
               `Experienced ${violations.length} violations out of ${samples.length} samples (${(violationRate * 100).toFixed(1)}%).`
    };
  }

  async measureMetrics(metrics) {
    // Query monitoring system for current metric values
    const values = {};
    for (const metric of metrics) {
      values[metric] = await this.queryMetric(metric);
    }
    return values;
  }

  async queryMetric(metric) {
    // Integration with monitoring system (Prometheus, Datadog, etc.)
    return Math.random() * 100;  // Placeholder
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Failure Injection Techniques

Chaos engineering introduces various types of failures to test system resilience.

### Network Failures

```javascript
class NetworkFailureInjector {
  constructor(targetService, failureType) {
    this.targetService = targetService;
    this.failureType = failureType;  // 'partition', 'latency', 'packet_loss'
  }

  async inject() {
    console.log(`Injecting ${this.failureType} for ${this.targetService}`);

    switch (this.failureType) {
      case 'partition':
        return await this.injectPartition();

      case 'latency':
        return await this.injectLatency();

      case 'packet_loss':
        return await this.injectPacketLoss();
    }
  }

  async injectPartition() {
    // Use iptables to drop packets to/from target service
    const rule = `iptables -A INPUT -s ${this.targetService.ip} -j DROP`;
    await this.executeCommand(rule);

    return {
      remove: async () => {
        const removeRule = `iptables -D INPUT -s ${this.targetService.ip} -j DROP`;
        await this.executeCommand(removeRule);
      }
    };
  }

  async injectLatency() {
    // Use tc (traffic control) to add latency
    const delay = 250;  // 250ms
    const commands = [
      `tc qdisc add dev eth0 root netem delay ${delay}ms`,
    ];

    for (const cmd of commands) {
      await this.executeCommand(cmd);
    }

    return {
      remove: async () => {
        await this.executeCommand('tc qdisc del dev eth0 root');
      }
    };
  }

  async injectPacketLoss() {
    // Use tc to drop random packets
    const lossRate = 5;  // 5% packet loss
    const cmd = `tc qdisc add dev eth0 root netem loss ${lossRate}%`;

    await this.executeCommand(cmd);

    return {
      remove: async () => {
        await this.executeCommand('tc qdisc del dev eth0 root');
      }
    };
  }

  async executeCommand(cmd) {
    // Execute shell command on target host
    console.log(`  Executing: ${cmd}`);
    // Implementation would use SSH or container exec
  }
}
```

### Process Failures

```javascript
class ProcessFailureInjector {
  constructor(processName, failureMode) {
    this.processName = processName;
    this.failureMode = failureMode;  // 'kill', 'pause', 'resource_exhaustion'
  }

  async inject() {
    switch (this.failureMode) {
      case 'kill':
        return await this.killProcess();

      case 'pause':
        return await this.pauseProcess();

      case 'resource_exhaustion':
        return await this.exhaustResources();
    }
  }

  async killProcess() {
    const pid = await this.findProcess(this.processName);

    console.log(`Killing process ${this.processName} (PID: ${pid})`);
    await this.executeCommand(`kill -9 ${pid}`);

    return {
      remove: async () => {
        console.log(`Process ${this.processName} should auto-restart`);
        // Verify process restarted
        await this.waitForProcess(this.processName);
      }
    };
  }

  async pauseProcess() {
    const pid = await this.findProcess(this.processName);

    console.log(`Pausing process ${this.processName} (PID: ${pid})`);
    await this.executeCommand(`kill -STOP ${pid}`);

    return {
      remove: async () => {
        console.log(`Resuming process ${this.processName}`);
        await this.executeCommand(`kill -CONT ${pid}`);
      }
    };
  }

  async exhaustResources() {
    // Use cgroups to limit CPU/memory
    const cgroupPath = `/sys/fs/cgroup/memory/${this.processName}`;

    console.log(`Limiting memory for ${this.processName} to 100MB`);
    await this.executeCommand(`echo 104857600 > ${cgroupPath}/memory.limit_in_bytes`);

    return {
      remove: async () => {
        console.log(`Removing memory limit for ${this.processName}`);
        await this.executeCommand(`echo -1 > ${cgroupPath}/memory.limit_in_bytes`);
      }
    };
  }

  async findProcess(name) {
    // Find process ID by name
    return 12345;  // Placeholder
  }

  async waitForProcess(name, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        await this.findProcess(name);
        return;
      } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error(`Process ${name} did not restart within ${timeout}ms`);
  }

  async executeCommand(cmd) {
    console.log(`  Executing: ${cmd}`);
  }
}
```

### Application-Level Failures

```javascript
class ApplicationFailureInjector {
  constructor(service, failureType) {
    this.service = service;
    this.failureType = failureType;  // 'exception', 'slow_response', 'error_response'
  }

  async inject() {
    // Inject failures at application layer via feature flags or API
    const config = {
      enabled: true,
      failureType: this.failureType,
      rate: 0.1,  // 10% of requests
      duration: 300000  // 5 minutes
    };

    console.log(`Injecting ${this.failureType} into ${this.service.name}`);
    await this.service.setFailureConfig(config);

    return {
      remove: async () => {
        console.log(`Removing ${this.failureType} from ${this.service.name}`);
        await this.service.setFailureConfig({ enabled: false });
      }
    };
  }
}

// Service with built-in failure injection
class ResilientService {
  constructor(name) {
    this.name = name;
    this.failureConfig = { enabled: false };
  }

  async setFailureConfig(config) {
    this.failureConfig = config;
  }

  async handleRequest(request) {
    // Check if we should inject failure
    if (this.failureConfig.enabled && Math.random() < this.failureConfig.rate) {
      return await this.injectFailure(request);
    }

    // Normal processing
    return await this.processRequest(request);
  }

  async injectFailure(request) {
    switch (this.failureConfig.failureType) {
      case 'exception':
        throw new Error('Chaos-injected exception');

      case 'slow_response':
        await new Promise(resolve => setTimeout(resolve, 5000));
        return await this.processRequest(request);

      case 'error_response':
        return { error: 'Service unavailable', statusCode: 503 };

      default:
        return await this.processRequest(request);
    }
  }

  async processRequest(request) {
    return { success: true, data: request.data };
  }
}
```

## Chaos Monkey

Chaos Monkey, created by Netflix, randomly terminates instances in production to ensure systems can tolerate instance failures.

```javascript
class ChaosMonkey {
  constructor(cluster, config = {}) {
    this.cluster = cluster;
    this.config = {
      enabled: config.enabled !== false,
      meanTimeBetweenKills: config.meanTimeBetweenKills || 3600000,  // 1 hour
      maxInstancesPerHour: config.maxInstancesPerHour || 1,
      excludedInstances: config.excludedInstances || [],
      allowedTimeWindow: config.allowedTimeWindow || {
        start: 10,  // 10:00 AM
        end: 16     // 4:00 PM
      },
      dryRun: config.dryRun || false
    };

    this.killCount = 0;
    this.running = false;
  }

  start() {
    if (!this.config.enabled) {
      console.log('Chaos Monkey disabled');
      return;
    }

    this.running = true;
    console.log('Chaos Monkey started');

    this.scheduleNextKill();
  }

  stop() {
    this.running = false;
    console.log('Chaos Monkey stopped');
  }

  scheduleNextKill() {
    if (!this.running) return;

    // Random delay based on mean time between kills
    const delay = this.exponentialRandom(this.config.meanTimeBetweenKills);

    setTimeout(async () => {
      await this.maybeKillInstance();
      this.scheduleNextKill();
    }, delay);
  }

  async maybeKillInstance() {
    // Check if we're in allowed time window
    if (!this.isInTimeWindow()) {
      console.log('Outside allowed time window, skipping');
      return;
    }

    // Check rate limit
    if (this.killCount >= this.config.maxInstancesPerHour) {
      console.log('Rate limit reached, skipping');
      return;
    }

    // Select random instance
    const instance = await this.selectVictim();

    if (!instance) {
      console.log('No eligible instances found');
      return;
    }

    // Kill it!
    await this.killInstance(instance);
  }

  async selectVictim() {
    const instances = await this.cluster.listInstances();

    // Filter out excluded instances
    const eligible = instances.filter(inst =>
      !this.config.excludedInstances.includes(inst.id)
    );

    if (eligible.length === 0) {
      return null;
    }

    // Select random instance
    const index = Math.floor(Math.random() * eligible.length);
    return eligible[index];
  }

  async killInstance(instance) {
    console.log(`\n🐵 Chaos Monkey killing instance: ${instance.id}`);

    if (this.config.dryRun) {
      console.log('(DRY RUN - not actually killing)');
      return;
    }

    try {
      await this.cluster.terminateInstance(instance.id);
      this.killCount++;

      console.log(`✓ Instance ${instance.id} terminated`);
      console.log(`  Total kills this hour: ${this.killCount}`);

      // Log to monitoring system
      await this.logEvent({
        type: 'instance_termination',
        instance: instance.id,
        timestamp: Date.now(),
        reason: 'chaos_monkey'
      });
    } catch (error) {
      console.error(`Failed to kill instance ${instance.id}:`, error);
    }
  }

  isInTimeWindow() {
    const now = new Date();
    const hour = now.getHours();

    return hour >= this.config.allowedTimeWindow.start &&
           hour < this.config.allowedTimeWindow.end;
  }

  exponentialRandom(mean) {
    return -Math.log(1 - Math.random()) * mean;
  }

  async logEvent(event) {
    // Send to monitoring/logging system
    console.log(`Event logged: ${JSON.stringify(event)}`);
  }

  resetHourlyCounter() {
    setInterval(() => {
      this.killCount = 0;
      console.log('Hourly kill counter reset');
    }, 3600000);
  }
}

// Usage
const chaosMonkey = new ChaosMonkey(cluster, {
  enabled: true,
  meanTimeBetweenKills: 7200000,  // 2 hours average
  maxInstancesPerHour: 2,
  excludedInstances: ['critical-db-1', 'critical-db-2'],
  allowedTimeWindow: { start: 10, end: 16 },  // Only during business hours
  dryRun: false
});

chaosMonkey.start();
```

## Game Days

Game days are scheduled exercises where teams simulate major failures to practice incident response.

```javascript
class GameDay {
  constructor(name, scenario) {
    this.name = name;
    this.scenario = scenario;
    this.participants = [];
    this.timeline = [];
    this.metrics = {};
  }

  addParticipant(role, person) {
    this.participants.push({ role, person });
  }

  async execute() {
    console.log(`\n==================================================`);
    console.log(`🎮 Game Day: ${this.name}`);
    console.log(`==================================================\n`);

    // Brief participants
    await this.briefing();

    // Execute scenario
    const startTime = Date.now();

    for (const step of this.scenario.steps) {
      await this.executeStep(step);
    }

    const duration = Date.now() - startTime;

    // Debrief and analyze
    await this.debrief(duration);
  }

  async briefing() {
    console.log('📋 Briefing\n');
    console.log(`Scenario: ${this.scenario.description}`);
    console.log(`\nParticipants:`);

    for (const { role, person } of this.participants) {
      console.log(`  - ${role}: ${person}`);
    }

    console.log('\nPress Enter to begin...');
    await this.waitForInput();
  }

  async executeStep(step) {
    console.log(`\n⏰ T+${step.timeOffset / 1000}s: ${step.description}`);

    await this.sleep(step.timeOffset);

    this.timeline.push({
      timestamp: Date.now(),
      description: step.description,
      type: step.type
    });

    switch (step.type) {
      case 'failure':
        await this.injectFailure(step.failure);
        break;

      case 'observation':
        await this.observe(step.metrics);
        break;

      case 'question':
        await this.askQuestion(step.question);
        break;

      case 'action':
        await this.logAction(step.action);
        break;
    }
  }

  async injectFailure(failure) {
    console.log(`\n💥 Injecting failure: ${failure.description}`);

    const injector = this.createInjector(failure);
    const handle = await injector.inject();

    this.timeline.push({
      timestamp: Date.now(),
      type: 'failure_injected',
      description: failure.description
    });

    return handle;
  }

  async observe(metrics) {
    console.log('\n📊 Observe current metrics:');

    for (const metric of metrics) {
      const value = await this.queryMetric(metric);
      console.log(`  ${metric}: ${value}`);

      this.metrics[metric] = this.metrics[metric] || [];
      this.metrics[metric].push({ timestamp: Date.now(), value });
    }
  }

  async askQuestion(question) {
    console.log(`\n❓ Question for team: ${question}`);
    console.log('Discuss and document answer...');
    await this.waitForInput();
  }

  async logAction(action) {
    console.log(`\n✅ Team should: ${action}`);

    this.timeline.push({
      timestamp: Date.now(),
      type: 'expected_action',
      description: action
    });

    await this.waitForInput();
  }

  async debrief(duration) {
    console.log(`\n==================================================`);
    console.log(`📝 Game Day Debrief`);
    console.log(`==================================================\n`);

    console.log(`Duration: ${(duration / 1000 / 60).toFixed(1)} minutes\n`);

    console.log('Timeline:');
    for (const event of this.timeline) {
      const offset = event.timestamp - this.timeline[0].timestamp;
      console.log(`  T+${(offset / 1000).toFixed(0)}s: ${event.description}`);
    }

    console.log('\n📈 Metric Summary:');
    for (const [metric, values] of Object.entries(this.metrics)) {
      const avg = values.reduce((sum, v) => sum + v.value, 0) / values.length;
      const max = Math.max(...values.map(v => v.value));
      console.log(`  ${metric}: avg=${avg.toFixed(2)}, max=${max.toFixed(2)}`);
    }

    console.log('\n💡 Lessons Learned:');
    console.log('(Team discussion and documentation...)');
  }

  async waitForInput() {
    return new Promise(resolve => {
      // In real implementation, wait for user input
      setTimeout(resolve, 1000);
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createInjector(failure) {
    // Factory method to create appropriate injector
    return new NetworkFailureInjector(failure.target, failure.mode);
  }

  async queryMetric(metric) {
    // Query monitoring system
    return Math.random() * 100;
  }
}

// Example game day scenario
const scenario = {
  description: 'Database primary failure during peak traffic',
  steps: [
    {
      timeOffset: 0,
      type: 'observation',
      description: 'Baseline metrics',
      metrics: ['latency_p99', 'error_rate', 'throughput']
    },
    {
      timeOffset: 60000,  // 1 minute
      type: 'failure',
      description: 'Primary database becomes unavailable',
      failure: {
        type: 'process_kill',
        target: 'db-primary',
        mode: 'kill'
      }
    },
    {
      timeOffset: 120000,  // 2 minutes
      type: 'observation',
      description: 'Observe system response',
      metrics: ['latency_p99', 'error_rate', 'throughput', 'db_connections']
    },
    {
      timeOffset: 180000,  // 3 minutes
      type: 'question',
      question: 'Has the system automatically failed over to a secondary? How long did it take?'
    },
    {
      timeOffset: 240000,  // 4 minutes
      type: 'action',
      description: 'If not automatic, team should manually initiate failover'
    },
    {
      timeOffset: 300000,  // 5 minutes
      type: 'observation',
      description: 'Verify recovery',
      metrics: ['latency_p99', 'error_rate', 'throughput']
    }
  ]
};

const gameDay = new GameDay('DB Failover Exercise', scenario);
gameDay.addParticipant('Incident Commander', 'Alice');
gameDay.addParticipant('Database Expert', 'Bob');
gameDay.addParticipant('Observability Lead', 'Carol');

// Run the game day
await gameDay.execute();
```

## Observability for Chaos

Effective chaos engineering requires comprehensive observability to understand system behavior during failures.

```javascript
class ChaosObservability {
  constructor(metricsSystem, loggingSystem, tracingSystem) {
    this.metrics = metricsSystem;
    this.logging = loggingSystem;
    this.tracing = tracingSystem;
  }

  async instrumentExperiment(experiment) {
    // Start recording detailed metrics
    const recording = await this.metrics.startRecording({
      experiment: experiment.name,
      granularity: '1s',  // 1-second resolution
      metrics: [
        'requests_per_second',
        'error_rate',
        'latency_p50',
        'latency_p99',
        'latency_p999',
        'active_connections',
        'queue_depth',
        'cpu_usage',
        'memory_usage'
      ]
    });

    // Enable detailed logging
    await this.logging.setLevel('DEBUG');

    // Trace all requests during experiment
    await this.tracing.setSamplingRate(1.0);  // 100% sampling

    return {
      stop: async () => {
        await recording.stop();
        await this.logging.setLevel('INFO');
        await this.tracing.setSamplingRate(0.01);  // Back to 1%
      },
      getResults: async () => {
        return {
          metrics: await recording.getData(),
          logs: await this.logging.getRecent(experiment.name),
          traces: await this.tracing.getTraces(experiment.name)
        };
      }
    };
  }

  async analyzeImpact(beforeMetrics, duringMetrics, afterMetrics) {
    const analysis = {
      latencyImpact: this.calculateImpact(
        beforeMetrics.latency_p99,
        duringMetrics.latency_p99
      ),
      errorRateImpact: this.calculateImpact(
        beforeMetrics.error_rate,
        duringMetrics.error_rate
      ),
      throughputImpact: this.calculateImpact(
        beforeMetrics.throughput,
        duringMetrics.throughput
      ),
      recoveryTime: this.calculateRecoveryTime(duringMetrics, afterMetrics)
    };

    return analysis;
  }

  calculateImpact(before, during) {
    const change = ((during - before) / before) * 100;
    return {
      absoluteChange: during - before,
      percentageChange: change,
      severity: this.categorizeSeverity(change)
    };
  }

  categorizeSeverity(percentageChange) {
    if (Math.abs(percentageChange) < 5) return 'minimal';
    if (Math.abs(percentageChange) < 20) return 'moderate';
    if (Math.abs(percentageChange) < 50) return 'significant';
    return 'severe';
  }

  calculateRecoveryTime(during, after) {
    // Find when metrics returned to normal
    return 45000;  // Placeholder - would analyze time series
  }
}
```

Chaos engineering transforms how we build and operate distributed systems, shifting from reactive incident response to proactive resilience testing. By embracing controlled failure injection, organizations build confidence in their systems' ability to withstand real-world chaos.
