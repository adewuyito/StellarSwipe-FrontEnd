/**
 * Analytics service for tracking user flows
 * Fire-and-forget, non-blocking event tracking
 */

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsService {
  track(event: string, properties?: AnalyticsProperties): void;
}

/**
 * Schedule a callback to run without blocking the current execution
 * Uses requestIdleCallback if available, falls back to setTimeout
 */
function scheduleNonBlocking(callback: () => void): void {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout: 1000 });
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * Stub analytics service that logs to console.debug
 * Can be swapped for Segment, Mixpanel, or other providers
 */
const analyticsService: AnalyticsService = {
  track(event: string, properties?: AnalyticsProperties) {
    scheduleNonBlocking(() => {
      console.debug('Analytics Event:', event, properties);
      // Integration point: Replace with actual analytics provider
      // Example: segment.track(event, properties);
      // Or: mixpanel.track(event, properties);
    });
  },
};

export default analyticsService;
