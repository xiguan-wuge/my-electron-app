import {onLCP, onFID, onCLS} from 'web-vitals';

export function getPerformance() {
  console.log('getPerformance');
  
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);

  // 发送分析报告
  onCLS(sendToGoogleAnalytics);
  onFID(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
}

export function sendToGoogleAnalytics({name, delta, id}) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/gtagjs
  gtag('event', name, {
    event_category: 'Web Vitals',
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Use a non-interaction event to avoid affecting bounce rate.
    non_interaction: true,
  });
}

