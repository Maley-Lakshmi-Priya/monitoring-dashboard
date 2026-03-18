/* ===== DASHBOARD PAGE ===== */

function renderDashboardPage() {
    const metrics = generateMetricsData();
    const o = metrics.overview;

    const html = `
        <div class="page-section">
            <div class="metrics-grid">
                ${createMetricsCard({ label: 'Total Throughput', value: formatThroughput(o.totalThroughput.value), unit: '', trend: o.totalThroughput.trend, change: o.totalThroughput.change, color: 'blue', icon: '⚡' })}
                ${createMetricsCard({ label: 'Avg Latency', value: formatLatency(o.avgLatency.value), unit: '', trend: o.avgLatency.trend, change: o.avgLatency.change, color: 'green', icon: '⏱' })}
                ${createMetricsCard({ label: 'Packet Loss', value: formatPercentage(o.packetLoss.value), unit: '', trend: o.packetLoss.trend, change: o.packetLoss.change, color: 'orange', icon: '📦' })}
                ${createMetricsCard({ label: 'Active UEs', value: o.activeUEs.value, unit: o.activeUEs.unit, trend: o.activeUEs.trend, change: o.activeUEs.change, color: 'blue', icon: '📱' })}
            </div>
        </div>

        <div class="page-section">
            ${createNetworkTopology(topologyData)}
        </div>

        <div class="page-section">
            <div class="grid-2">
                ${createChartHTML('chart-throughput', '📈 Throughput (Mbps)')}
                ${createChartHTML('chart-latency', '📉 Latency (ms)')}
            </div>
        </div>

        <div class="page-section">
            <div class="grid-2-1">
                <div class="panel">
                    <div class="panel-header">
                        <span class="panel-title">📡 gNB Status</span>
                    </div>
                    <div class="panel-body" style="padding:0;">
                        <table class="data-table">
                            <thead><tr><th>Node</th><th>Type</th><th>Band</th><th>UEs</th><th>DL / UL</th><th>Status</th></tr></thead>
                            <tbody>
                                ${topologyData.radioAccess.map(g => `
                                    <tr>
                                        <td><strong>${g.name}</strong></td>
                                        <td>${g.type}</td>
                                        <td class="mono">${g.band}</td>
                                        <td>${g.connectedUEs}</td>
                                        <td>${formatThroughput(g.throughputDL)} / ${formatThroughput(g.throughputUL)}</td>
                                        <td>${createStatusBadge(g.status)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel">
                    <div class="panel-header">
                        <span class="panel-title">🔔 Recent Alerts</span>
                    </div>
                    <div class="panel-body" style="padding:0; max-height:280px; overflow-y:auto;">
                        ${alertsData.slice(0, 4).map(a => `
                            <div class="alert-item">
                                <div class="alert-icon ${a.severity}">${a.severity === 'critical' ? '🔴' : a.severity === 'warning' ? '🟡' : 'ℹ️'}</div>
                                <div class="alert-content">
                                    <div class="alert-title">${a.title}</div>
                                    <div class="alert-desc">${a.source}</div>
                                </div>
                                <div class="alert-time">${timeAgo(a.time)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('page-container').innerHTML = html;

    // Draw charts
    createChart('chart-throughput', metrics.throughputHistory, { color: COLORS.blue, yLabel: 'Mbps' });
    createChart('chart-latency', metrics.latencyHistory, { color: COLORS.green, yLabel: 'ms' });

    // Draw topology lines
    setTimeout(() => drawTopologyLines(topologyData.connections, topologyPositions), 100);
}
