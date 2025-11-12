/**
 * Performance optimization utilities for enhanced loading and runtime performance
 * @version 2.0.0
 */

// Performance budget in milliseconds
const PERFORMANCE_BUDGET = {
    FCP: 1800,  // First Contentful Paint
    LCP: 2500,  // Largest Contentful Paint
    TTI: 3800,  // Time to Interactive
    TBT: 300,   // Total Blocking Time
    CLS: 0.1,   // Cumulative Layout Shift
};

// Performance metrics collector
const performanceMetrics = {
    navigationStart: performance?.now() || Date.now(),
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    timeToInteractive: 0,
    totalBlockingTime: 0,
    cumulativeLayoutShift: 0,
    memoryUsage: 0,
    
    // Track resource timing
    resourceTimings: [],
    
    // Track long tasks
    longTasks: [],
    
    // Track layout shifts
    layoutShifts: []
};

/**
 * Logs performance metrics to the console and analytics
 */
function logPerformanceMetrics() {
    if (!('performance' in window)) return;

    // Navigation Timing API v2
    const [navigationEntry] = performance.getEntriesByType('navigation');
    const [fcpEntry] = performance.getEntriesByName('first-contentful-paint');
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries[lcpEntries.length - 1];
    
    // Calculate TBT (Total Blocking Time)
    const longTaskEntries = performance.getEntriesByType('long-task');
    const tbt = longTaskEntries.reduce((total, task) => {
        return total + (task.duration - 50); // Tasks over 50ms are considered blocking
    }, 0);

    const metrics = {
        // Core Web Vitals
        fcp: fcpEntry?.startTime || 0,
        lcp: lcp?.renderTime || lcp?.loadTime || 0,
        tbt: Math.round(tbt),
        cls: performanceMetrics.cumulativeLayoutShift,
        fid: 0, // Will be updated by web-vitals
        
        // Navigation Timing
        dns: navigationEntry?.domainLookupEnd - navigationEntry?.domainLookupStart || 0,
        tcp: navigationEntry?.connectEnd - navigationEntry?.connectStart || 0,
        ttfb: navigationEntry?.responseStart - navigationEntry?.requestStart || 0,
        domReady: navigationEntry?.domComplete - navigationEntry?.domLoading || 0,
        pageLoad: navigationEntry?.loadEventStart - navigationEntry?.startTime || 0,
        
        // Memory usage (if available)
        memory: performance.memory ? {
            usedJSHeapSize: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
            totalJSHeapSize: (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
            jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + ' MB'
        } : 'N/A',
        
        // Performance budget compliance
        budgetCompliance: {
            fcp: (fcpEntry?.startTime || 0) <= PERFORMANCE_BUDGET.FCP,
            lcp: (lcp?.renderTime || lcp?.loadTime || 0) <= PERFORMANCE_BUDGET.LCP,
            tbt: tbt <= PERFORMANCE_BUDGET.TBT,
            cls: performanceMetrics.cumulativeLayoutShift <= PERFORMANCE_BUDGET.CLS
        }
    };
    
    console.group('Performance Metrics');
    console.table(metrics);
    console.groupEnd();
    
    // Send to analytics if available
    if (window.gtag) {
        // Core Web Vitals
        gtag('event', 'web_vitals', {
            'event_category': 'Web Vitals',
            'event_label': 'FCP',
            'value': Math.round(metrics.fcp),
            'non_interaction': true
        });
        
        // Performance timing
        gtag('event', 'timing_complete', {
            'name': 'page_load',
            'value': metrics.pageLoad,
            'event_category': 'Load Performance',
            'non_interaction': true
        });
    }
    
    return metrics;
}

/**
 * Optimizes image loading with lazy loading, responsive images, and priority hints
 */
function optimizeImages() {
    if (typeof document === 'undefined' || !('IntersectionObserver' in window)) return;
    
    const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
    if (!lazyImages.length) return;
    
    // Preconnect to image CDN if not already connected
    const imageDomains = new Set();
    lazyImages.forEach(img => {
        try {
            const url = new URL(img.dataset.src || img.src);
            imageDomains.add(url.origin);
        } catch (e) {}
    });
    
    imageDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
    });
    
    // Configure Intersection Observer with performance optimizations
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            const img = entry.target;
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            // Load the image
            if (src) {
                // Use requestIdleCallback for non-critical image loading
                const loadImage = () => {
                    img.onload = () => {
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        if (srcset) img.removeAttribute('data-srcset');
                        observer.unobserve(img);
                    };
                    img.src = src;
                    if (srcset) img.srcset = srcset;
                };
                
                // Use requestIdleCallback if available, otherwise load immediately
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadImage, { timeout: 2000 });
                } else {
                    loadImage();
                }
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.01
    });
    
    // Observe all lazy images
    lazyImages.forEach(img => {
        // Add a small placeholder for better CLS
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
            const width = img.offsetWidth || 100;
            const height = img.offsetHeight || Math.round(width * 0.75);
            img.setAttribute('width', width);
            img.setAttribute('height', height);
            img.style.aspectRatio = `${width} / ${height}`;
        }
        
        // Add a low-quality image placeholder if available
        if (img.dataset.lqip) {
            img.style.background = `url('${img.dataset.lqip}') no-repeat center/cover`;
        }
        
        imageObserver.observe(img);
    });
    
    // Handle responsive images
    const sources = document.querySelectorAll('source[data-srcset]');
    sources.forEach(source => {
        if (source.dataset.srcset) {
            source.srcset = source.dataset.srcset;
            source.removeAttribute('data-srcset');
        }
    });
}

/**
 * Optimizes animations for better performance
 */
function optimizeAnimations() {
    // Add will-change to elements that will be animated
    const animatedElements = document.querySelectorAll('.animate, [class*="animate-"]');
    animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        el.style.backfaceVisibility = 'hidden';
        el.style.perspective = '1000px';
    });
    
    // Reduce motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        
        const animations = document.querySelectorAll('*');
        animations.forEach(el => {
            const style = getComputedStyle(el);
            if (style.animationName !== 'none' || style.transition !== 'all 0s ease 0s') {
                el.style.animation = 'none';
                el.style.transition = 'none';
            }
        });
    }
}

/**
 * Optimizes third-party scripts loading
 */
function optimizeThirdPartyScripts() {
    // Defer non-critical third-party scripts
    const thirdPartyScripts = [
        // Add any third-party scripts that can be deferred
    ];
    
    // Load third-party scripts with resource hints
    thirdPartyScripts.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = new URL(src).origin;
        document.head.appendChild(link);
        
        if (src.includes('analytics') || src.includes('google-analytics')) {
            // Load analytics with lower priority
            window.requestIdleCallback(() => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.body.appendChild(script);
            }, { timeout: 5000 });
        }
    });
}

/**
 * Initializes performance optimizations
 */
function initPerformanceOptimizations() {
    // Optimize images and animations
    optimizeImages();
    optimizeAnimations();
    
    // Optimize third-party scripts
    if ('requestIdleCallback' in window) {
        requestIdleCallback(optimizeThirdPartyScripts, { timeout: 2000 });
    } else {
        optimizeThirdPartyScripts();
    }
    
    // Log performance metrics after page load
    if (document.readyState === 'complete') {
        logPerformanceMetrics();
    } else {
        window.addEventListener('load', logPerformanceMetrics, { once: true });
    }
    
    // Report Web Vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(metric => {
                performanceMetrics.cumulativeLayoutShift = metric.value;
                console.log('CLS:', metric.value);
            }, true);
            
            getFID(metric => {
                performanceMetrics.firstInputDelay = metric.value;
                console.log('FID:', metric.value);
            });
            
            getFCP(metric => {
                performanceMetrics.firstContentfulPaint = metric.value;
                console.log('FCP:', metric.value);
            });
            
            getLCP(metric => {
                performanceMetrics.largestContentfulPaint = metric.value;
                console.log('LCP:', metric.value);
            });
            
            getTTFB(console.log);
        }).catch(console.warn);
    }
}

// Initialize performance optimizations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
    // DOMContentLoaded has already fired
    initPerformanceOptimizations();
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        logPerformanceMetrics,
        optimizeImages,
        optimizeAnimations,
        optimizeThirdPartyScripts,
        initPerformanceOptimizations
    };
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
