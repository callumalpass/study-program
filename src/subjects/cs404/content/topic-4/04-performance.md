# Performance Monitoring

## Introduction

Performance monitoring transforms performance optimization from guesswork into data-driven decision-making. While optimization focuses on making improvements, monitoring focuses on measuring and tracking performance metrics over time to identify bottlenecks, regressions, and opportunities for improvement. Effective performance monitoring provides visibility into how your application actually performs in production environments, with real users, on various devices and network conditions.

Modern web applications require comprehensive monitoring across multiple dimensions: frontend rendering performance, backend response times, database query execution, network latency, and resource utilization. Without monitoring, you're flying blind—you might think your application is fast, but users could be experiencing significant delays that drive them away. Performance monitoring enables you to proactively identify and fix issues before they impact user satisfaction.

## Understanding Performance Monitoring

Performance monitoring encompasses several interconnected areas, each providing unique insights into your application's behavior.

### Browser Performance Metrics

Modern browsers provide extensive performance APIs that measure various aspects of page load and runtime performance. The Navigation Timing API, Resource Timing API, and Paint Timing API expose detailed metrics about how quickly pages load and render. Key metrics include Time to First Byte (TTFB), First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to Interactive (TTI), Cumulative Layout Shift (CLS), and First Input Delay (FID).

These metrics, collectively known as Core Web Vitals, directly impact user experience and SEO rankings. LCP measures loading performance and should occur within 2.5 seconds. FID measures interactivity and should be less than 100 milliseconds. CLS measures visual stability and should be less than 0.1. Monitoring these metrics helps ensure your application meets modern performance standards.

Beyond page load, runtime performance monitoring tracks JavaScript execution time, frame rates, memory usage, and garbage collection patterns. Long-running scripts that block the main thread create janky experiences where the interface freezes or stutters. Memory leaks cause performance degradation over time. Monitoring these runtime metrics helps identify performance regressions as you add features.

### Backend Performance Metrics

Server-side performance monitoring tracks request processing time, database query performance, external API call latency, memory usage, CPU utilization, and error rates. Application Performance Monitoring (APM) tools like New Relic, DataDog, or Application Insights provide detailed transaction tracing that shows exactly where time is spent processing each request.

Request duration tracking helps identify slow endpoints that need optimization. Database query monitoring reveals slow queries, N+1 problems, or missing indexes. External service monitoring shows which third-party APIs introduce latency. Resource utilization monitoring prevents capacity issues by alerting when servers approach memory or CPU limits.

Distributed tracing becomes critical in microservice architectures where a single user request might touch multiple services. Tracing tools track requests across service boundaries, showing the complete request flow and identifying bottlenecks anywhere in the system.

### Real User Monitoring (RUM)

Real User Monitoring collects performance data from actual users in production environments. Unlike synthetic monitoring that tests from controlled locations, RUM shows how real users experience your application across different devices, browsers, network conditions, and geographic locations.

RUM reveals performance variations you can't detect in development: mobile users might experience significantly worse performance, users in distant regions might suffer from network latency, certain browser versions might have compatibility issues. RUM also correlates performance with business metrics, showing how page load time affects conversion rates or user engagement.

### Synthetic Monitoring

Synthetic monitoring uses automated scripts to regularly test your application from various locations and devices, providing consistent baseline measurements even when traffic is low. It enables proactive detection of performance regressions before users are affected and validates that performance remains acceptable across different regions and conditions.

Lighthouse CI, WebPageTest, and commercial services provide synthetic monitoring capabilities. They can run as part of your deployment pipeline, automatically failing deployments that regress performance beyond acceptable thresholds.

### Application-Specific Metrics

Beyond generic performance metrics, monitor metrics specific to your application's business logic. For a video streaming service, monitor buffering frequency and startup time. For an e-commerce site, monitor search response time and checkout flow performance. For a collaborative tool, monitor real-time sync latency.

Custom metrics tied to specific user flows provide actionable insights. If users abandon shopping carts, correlate that with checkout page load time. If users rarely use a feature, check whether slow performance discourages usage.

## Practical Implementation

### Browser Performance Monitoring

```typescript
interface PerformanceMetrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  domContentLoaded: number;
  windowLoad: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private clsValue = 0;
  private clsEntries: PerformanceEntry[] = [];

  constructor() {
    this.measureNavigationTiming();
    this.measurePaintTiming();
    this.measureLargestContentfulPaint();
    this.measureFirstInputDelay();
    this.measureCumulativeLayoutShift();
  }

  private measureNavigationTiming(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        this.metrics.windowLoad = navigation.loadEventEnd - navigation.fetchStart;
      }
    });
  }

  private measurePaintTiming(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  private measureLargestContentfulPaint(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      this.metrics.lcp = lastEntry.startTime;
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private measureFirstInputDelay(): void {
    const observer = new PerformanceObserver((list) => {
      const firstInput = list.getEntries()[0] as any;
      this.metrics.fid = firstInput.processingStart - firstInput.startTime;

      // Send FID to analytics
      this.sendMetric('fid', this.metrics.fid);
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  private measureCumulativeLayoutShift(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          this.clsValue += (entry as any).value;
          this.clsEntries.push(entry);
        }
      }

      this.metrics.cls = this.clsValue;
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Report CLS when page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendMetric('cls', this.metrics.cls || 0);
      }
    });
  }

  measureCustomTiming(name: string, startMark?: string): void {
    const endMark = `${name}-end`;
    performance.mark(endMark);

    if (startMark) {
      performance.measure(name, startMark, endMark);
    }

    const measure = performance.getEntriesByName(name)[0];
    if (measure) {
      this.sendMetric(name, measure.duration);
    }
  }

  getMetrics(): PerformanceMetrics {
    return this.metrics as PerformanceMetrics;
  }

  private sendMetric(name: string, value: number): void {
    // Send to analytics service
    if (typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon('/api/metrics', JSON.stringify({
        name,
        value,
        timestamp: Date.now(),
        url: window.location.pathname,
        userAgent: navigator.userAgent
      }));
    }
  }

  // Monitor long tasks that block the main thread
  monitorLongTasks(): void {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime
        });

        // Send to monitoring service
        this.sendMetric('long-task', entry.duration);
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  }
}

// Initialize monitoring
const perfMonitor = new PerformanceMonitor();

// Monitor custom operations
performance.mark('data-fetch-start');
fetchData().then(() => {
  perfMonitor.measureCustomTiming('data-fetch', 'data-fetch-start');
});

// Monitor long tasks
perfMonitor.monitorLongTasks();
```

### API Performance Tracking

```typescript
interface RequestMetrics {
  url: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
}

class ApiPerformanceTracker {
  private requests: RequestMetrics[] = [];
  private maxStoredRequests = 100;

  trackRequest(url: string, method: string): () => void {
    const startTime = performance.now();

    return (status: number = 200) => {
      const duration = performance.now() - startTime;

      const metric: RequestMetrics = {
        url,
        method,
        duration,
        status,
        timestamp: Date.now()
      };

      this.requests.push(metric);

      // Keep only recent requests
      if (this.requests.length > this.maxStoredRequests) {
        this.requests.shift();
      }

      // Log slow requests
      if (duration > 1000) {
        console.warn(`Slow API request: ${method} ${url} took ${duration.toFixed(0)}ms`);
      }

      // Send to monitoring service
      this.reportMetric(metric);
    };
  }

  private reportMetric(metric: RequestMetrics): void {
    // Batch metrics and send periodically
    if (this.requests.length % 10 === 0) {
      this.flush();
    }
  }

  private flush(): void {
    if (this.requests.length === 0) return;

    const metrics = [...this.requests];
    this.requests = [];

    fetch('/api/performance/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metrics })
    }).catch(err => console.error('Failed to send metrics:', err));
  }

  getStats(): {
    average: number;
    p50: number;
    p95: number;
    p99: number;
    slowest: RequestMetrics | null;
  } {
    if (this.requests.length === 0) {
      return { average: 0, p50: 0, p95: 0, p99: 0, slowest: null };
    }

    const sorted = [...this.requests].sort((a, b) => a.duration - b.duration);
    const sum = sorted.reduce((acc, r) => acc + r.duration, 0);

    return {
      average: sum / sorted.length,
      p50: sorted[Math.floor(sorted.length * 0.5)].duration,
      p95: sorted[Math.floor(sorted.length * 0.95)].duration,
      p99: sorted[Math.floor(sorted.length * 0.99)].duration,
      slowest: sorted[sorted.length - 1]
    };
  }
}

// Global tracker instance
const apiTracker = new ApiPerformanceTracker();

// Wrapper for fetch with automatic tracking
async function trackedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const endTracking = apiTracker.trackRequest(url, options.method || 'GET');

  try {
    const response = await fetch(url, options);
    endTracking(response.status);
    return response;
  } catch (error) {
    endTracking(0);
    throw error;
  }
}

// Usage
const response = await trackedFetch('/api/users');
const users = await response.json();

// View statistics
console.log('API Stats:', apiTracker.getStats());
```

### Resource Usage Monitoring

```typescript
class ResourceMonitor {
  private memoryChecks: number[] = [];
  private intervalId?: number;

  startMonitoring(interval: number = 10000): void {
    this.intervalId = window.setInterval(() => {
      this.checkMemory();
      this.checkResources();
    }, interval);
  }

  stopMonitoring(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private checkMemory(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;

      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

      this.memoryChecks.push(usagePercent);

      // Keep last 100 checks
      if (this.memoryChecks.length > 100) {
        this.memoryChecks.shift();
      }

      // Warn if memory usage is high
      if (usagePercent > 90) {
        console.warn('High memory usage:', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          total: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
          percent: `${usagePercent.toFixed(2)}%`
        });
      }

      // Send to monitoring
      this.sendMetric('memory-usage', usagePercent);
    }
  }

  private checkResources(): void {
    const resources = performance.getEntriesByType('resource');

    // Find large resources
    const largeResources = resources.filter(r => r.transferSize && r.transferSize > 500000);

    if (largeResources.length > 0) {
      console.warn('Large resources detected:', largeResources.map(r => ({
        name: r.name,
        size: `${(r.transferSize! / 1024).toFixed(2)} KB`,
        duration: `${r.duration.toFixed(2)} ms`
      })));
    }

    // Check for slow resources
    const slowResources = resources.filter(r => r.duration > 2000);

    if (slowResources.length > 0) {
      console.warn('Slow resources detected:', slowResources.map(r => ({
        name: r.name,
        duration: `${r.duration.toFixed(2)} ms`
      })));
    }
  }

  getMemoryTrend(): { increasing: boolean; averageUsage: number } {
    if (this.memoryChecks.length < 10) {
      return { increasing: false, averageUsage: 0 };
    }

    const recent = this.memoryChecks.slice(-10);
    const older = this.memoryChecks.slice(-20, -10);

    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

    return {
      increasing: recentAvg > olderAvg + 5, // 5% threshold
      averageUsage: recentAvg
    };
  }

  private sendMetric(name: string, value: number): void {
    navigator.sendBeacon?.('/api/metrics', JSON.stringify({
      name,
      value,
      timestamp: Date.now()
    }));
  }
}

// Initialize resource monitoring
const resourceMonitor = new ResourceMonitor();
resourceMonitor.startMonitoring(30000); // Check every 30 seconds

// Check memory trend periodically
setInterval(() => {
  const trend = resourceMonitor.getMemoryTrend();
  if (trend.increasing) {
    console.warn('Potential memory leak detected - usage trending upward');
  }
}, 60000);
```

### Performance Budget Enforcement

```typescript
interface PerformanceBudget {
  lcp: number;
  fid: number;
  cls: number;
  bundleSize: number;
  requestCount: number;
}

class PerformanceBudgetMonitor {
  private budget: PerformanceBudget = {
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    bundleSize: 300000, // 300KB
    requestCount: 50
  };

  checkBudget(): { passed: boolean; violations: string[] } {
    const violations: string[] = [];
    const metrics = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    // Check LCP
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      const lcp = lcpEntries[lcpEntries.length - 1].startTime;
      if (lcp > this.budget.lcp) {
        violations.push(`LCP ${lcp.toFixed(0)}ms exceeds budget of ${this.budget.lcp}ms`);
      }
    }

    // Check bundle size
    const scripts = performance.getEntriesByType('resource')
      .filter(r => r.name.endsWith('.js'));

    const totalSize = scripts.reduce((sum, s) => sum + (s.transferSize || 0), 0);

    if (totalSize > this.budget.bundleSize) {
      violations.push(`Bundle size ${(totalSize / 1024).toFixed(0)}KB exceeds budget of ${(this.budget.bundleSize / 1024).toFixed(0)}KB`);
    }

    // Check request count
    const requestCount = performance.getEntriesByType('resource').length;
    if (requestCount > this.budget.requestCount) {
      violations.push(`${requestCount} requests exceeds budget of ${this.budget.requestCount}`);
    }

    return {
      passed: violations.length === 0,
      violations
    };
  }

  setBudget(budget: Partial<PerformanceBudget>): void {
    this.budget = { ...this.budget, ...budget };
  }

  reportViolations(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const result = this.checkBudget();

        if (!result.passed) {
          console.error('Performance budget violations:', result.violations);

          // Send to monitoring
          fetch('/api/performance/budget-violations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              violations: result.violations,
              url: window.location.href,
              timestamp: Date.now()
            })
          });
        }
      }, 1000);
    });
  }
}

// Initialize budget monitoring
const budgetMonitor = new PerformanceBudgetMonitor();
budgetMonitor.reportViolations();
```

## Key Takeaways

- Monitor Core Web Vitals (LCP, FID, CLS) as they directly impact user experience and SEO
- Track both page load performance and runtime performance for complete visibility
- Implement Real User Monitoring to understand actual user experience across devices and locations
- Use performance budgets to prevent regressions during development
- Monitor backend metrics like request duration, database query time, and resource utilization
- Track custom metrics specific to your application's critical user flows
- Set up alerts for performance degradation to catch issues proactively
- Correlate performance metrics with business metrics to quantify performance impact
- Use distributed tracing in complex architectures to identify bottlenecks across services
- Regularly review performance data to identify optimization opportunities

## Common Mistakes

### Mistake 1: Only Monitoring in Production

**Problem:** Waiting until production to monitor performance means users experience problems before you detect them, and you lose the ability to catch regressions during development.

**Solution:** Implement monitoring in all environments. Use performance budgets in CI/CD to automatically fail builds that regress performance. Run synthetic monitoring against staging environments. Make performance visible during development.

### Mistake 2: Tracking Metrics Without Acting on Them

**Problem:** Collecting extensive performance data but never analyzing it or making improvements based on findings. Monitoring without action wastes resources.

**Solution:** Regularly review performance metrics, set specific improvement goals, prioritize optimizations based on impact, and track progress. Use performance data to inform development decisions and feature prioritization.

### Mistake 3: Ignoring Mobile Performance

**Problem:** Testing only on powerful development machines while users experience significantly worse performance on mobile devices with limited CPU and network bandwidth.

**Solution:** Test on real mobile devices or use browser throttling to simulate mobile conditions. Monitor RUM data segmented by device type. Optimize specifically for mobile performance constraints.

### Mistake 4: Not Correlating Performance with User Behavior

**Problem:** Viewing performance in isolation without understanding its business impact. A slow feature might not matter if users rarely access it.

**Solution:** Correlate performance metrics with user engagement, conversion rates, and other business metrics. Prioritize optimizing the flows that most impact business outcomes. Use funnel analysis to identify where performance hurts conversion.

### Mistake 5: Overwhelming Alerts and Alert Fatigue

**Problem:** Setting too many alerts or overly sensitive thresholds leads to constant notifications that teams learn to ignore, causing real issues to be missed.

**Solution:** Set alert thresholds based on actual impact to users. Use anomaly detection rather than fixed thresholds when appropriate. Implement alert escalation for critical issues. Regularly tune alerts to reduce noise while catching genuine problems.
