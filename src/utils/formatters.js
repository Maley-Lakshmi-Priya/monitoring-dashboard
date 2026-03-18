/* ===== FORMATTING UTILITIES ===== */

function formatThroughput(mbps) {
    if (mbps >= 1000) return (mbps / 1000).toFixed(1) + ' Gbps';
    return mbps.toFixed(1) + ' Mbps';
}

function formatLatency(ms) {
    if (ms < 1) return (ms * 1000).toFixed(0) + ' µs';
    return ms.toFixed(1) + ' ms';
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatPercentage(val) {
    return val.toFixed(1) + '%';
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
}

function formatDateTime(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + formatTime(date);
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return seconds + 's ago';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    return Math.floor(seconds / 86400) + 'd ago';
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(randomInRange(min, max + 1));
}
