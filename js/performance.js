// Performance monitoring and optimization utilities

/**
 * Logs performance metrics to the console and analytics
 */
function logPerformanceMetrics() {
    if (!('performance' in window)) return;

    // Navigation Timing API metrics
    const timing = performance.timing;
    const metrics = {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        ttfb: timing.responseStart - timing.requestStart,
        pageLoad: timing.loadEventStart - timing.navigationStart,
        domReady: timing.domComplete - timing.domLoading,
        contentLoad: timing.domContentLoadedEventStart - timing.domLoading,
        pageSize: performance.memory ? (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'
    };
    
    console.log('Performance Metrics:', metrics);
    
    // Send to analytics if available
    if (window.gtag) {
        gtag('event', 'timing_complete', {
            'name': 'page_load',
            'value': metrics.pageLoad,
            'event_category': 'Load Performance',
            'non_interaction': true
        });
    }
}

/**
 * Reports Web Vitals metrics
 */
function reportWebVitals() {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const reportHandler = (metric) => {
        console.log(metric.name, metric.value);
        
        // Send to analytics if available
        if (window.gtag) {
            gtag('event', 'web_vitals', {
                'event_category': 'Web Vitals',
                'event_label': metric.name,
                'value': Math.round(metric.value),
                'non_interaction': true
            });
        }
    };

    // Load web-vitals library and report metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportHandler, true);
        getFID(reportHandler);
        getFCP(reportHandler);
        getLCP(reportHandler);
        getTTFB(reportHandler);
    }).catch(err => {
        console.warn('Could not load web-vitals:', err);
    });
}

/**
 * Optimizes image loading with lazy loading and responsive images
 */
function optimizeImages() {
    if (typeof document === 'undefined') return;
    
    // Lazy load images with Intersection Observer
    if ('IntersectionObserver' in window) {
        const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
        
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px', // Start loading images 200px before they're in view
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize performance monitoring when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Log initial performance metrics
    if (document.readyState === 'complete') {
        logPerformanceMetrics();
    } else {
        window.addEventListener('load', logPerformanceMetrics);
    }
    
    // Start Web Vitals monitoring
    reportWebVitals();
    
    // Optimize images
    optimizeImages();
});

// Export functions for module usage
export { logPerformanceMetrics, reportWebVitals, optimizeImages };
