/* ===== METRICS DATA ===== */

function generateMetricsData() {
    return {
        overview: {
            totalThroughput: { value: randomInRange(1100, 1400), unit: 'Mbps', trend: 'up', change: '+5.2%' },
            avgLatency: { value: randomInRange(2.5, 5.5), unit: 'ms', trend: 'down', change: '-0.8ms' },
            packetLoss: { value: randomInRange(0.01, 0.15), unit: '%', trend: 'stable', change: '~0.01%' },
            activeUEs: { value: randomInt(55, 70), unit: 'devices', trend: 'up', change: '+3' },
            activeSessions: { value: randomInt(40, 65), unit: 'PDU sessions', trend: 'up', change: '+5' },
            registeredUEs: { value: randomInt(95, 120), unit: 'total', trend: 'stable', change: '—' },
        },
        throughputHistory: generateTimeSeriesData(24, 800, 1500),
        latencyHistory: generateTimeSeriesData(24, 2, 8),
        packetLossHistory: generateTimeSeriesData(24, 0, 0.3),
        ueCountHistory: generateTimeSeriesData(24, 30, 75),
    };
}

function generateTimeSeriesData(points, min, max) {
    const data = [];
    const now = new Date();
    for (let i = points - 1; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 300000); // 5-min intervals
        data.push({
            time: formatTime(timestamp),
            value: randomInRange(min, max),
        });
    }
    return data;
}

/* Alerts data */
const alertsData = [
    { id: 1, severity: 'critical', title: 'gNB-3 Connection Lost', desc: 'NGAP connection to AMF timed out. Last heartbeat: 15 min ago. Cell coverage area affected.', time: new Date(Date.now() - 900000), source: 'gNB-3', acknowledged: false },
    { id: 2, severity: 'warning', title: 'AUSF High CPU Usage', desc: 'CPU utilization at 89%. Authentication requests experiencing increased latency (>50ms).', time: new Date(Date.now() - 1800000), source: 'AUSF', acknowledged: false },
    { id: 3, severity: 'warning', title: 'UPF Throughput Degradation', desc: 'Downlink throughput dropped by 15% in the last 30 minutes. Possible congestion on N6 interface.', time: new Date(Date.now() - 2700000), source: 'UPF', acknowledged: false },
    { id: 4, severity: 'info', title: 'SMF Configuration Updated', desc: 'Session management policies updated successfully. 3 new QoS profiles applied.', time: new Date(Date.now() - 5400000), source: 'SMF', acknowledged: true },
    { id: 5, severity: 'info', title: 'New UE Registered', desc: 'IMSI 001010000000003 successfully authenticated and registered via AMF.', time: new Date(Date.now() - 7200000), source: 'AMF', acknowledged: true },
    { id: 6, severity: 'critical', title: 'PDU Session Establishment Failure', desc: 'Multiple UEs reporting PDU session failures. SMF unable to allocate IP from pool.', time: new Date(Date.now() - 3600000), source: 'SMF', acknowledged: false },
];
