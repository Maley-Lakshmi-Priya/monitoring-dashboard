/* ===== RADIO ACCESS PAGE ===== */

function renderRadioAccessPage() {
    const gnbs = topologyData.radioAccess;
    const totalUEs = gnbs.reduce((s, g) => s + g.connectedUEs, 0);
    const totalDL = gnbs.reduce((s, g) => s + g.throughputDL, 0);
    const totalUL = gnbs.reduce((s, g) => s + g.throughputUL, 0);
    const metrics = generateMetricsData();

    const html = `
        <div class="page-section">
            <h2 class="section-title">📡 RAN Overview</h2>
            <div class="metrics-grid">
                ${createMetricsCard({ label: 'Total gNBs', value: gnbs.length, unit: 'cells', trend: 'stable', change: `${gnbs.filter(g => g.status === STATUS.ONLINE).length} active`, color: 'blue', icon: '📡' })}
                ${createMetricsCard({ label: 'Connected UEs', value: totalUEs, unit: 'devices', trend: 'up', change: '+3 new', color: 'green', icon: '📱' })}
                ${createMetricsCard({ label: 'Total DL', value: formatThroughput(totalDL), unit: '', trend: 'up', change: '+5%', color: 'blue', icon: '⬇️' })}
                ${createMetricsCard({ label: 'Total UL', value: formatThroughput(totalUL), unit: '', trend: 'stable', change: '~steady', color: 'orange', icon: '⬆️' })}
            </div>
        </div>

        <div class="page-section">
            <h2 class="section-title">📋 gNB Details</h2>
            <div class="grid-3">
                ${gnbs.map(g => `
                    <div class="panel">
                        <div class="panel-header">
                            <span class="panel-title">${g.name}</span>
                            ${createStatusBadge(g.status)}
                        </div>
                        <div class="panel-body">
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.8rem;">
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">Type</div>
                                    <div style="font-weight:600;">${g.type}</div>
                                </div>
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">Band / Freq</div>
                                    <div style="font-weight:600;">${g.band} · ${g.frequency}</div>
                                </div>
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">PRBs</div>
                                    <div style="font-weight:600;">${g.prb}</div>
                                </div>
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">Connected UEs</div>
                                    <div style="font-weight:600;color:var(--accent-green)">${g.connectedUEs}</div>
                                </div>
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">Downlink</div>
                                    <div style="font-weight:600;color:var(--accent-blue)">${formatThroughput(g.throughputDL)}</div>
                                </div>
                                <div>
                                    <div style="color:var(--text-secondary);margin-bottom:4px;">Uplink</div>
                                    <div style="font-weight:600;color:var(--accent-orange)">${formatThroughput(g.throughputUL)}</div>
                                </div>
                            </div>
                            <div style="margin-top:16px;">
                                <div style="color:var(--text-secondary);font-size:0.75rem;margin-bottom:6px;">IP Address</div>
                                <div class="mono" style="font-size:0.75rem;">${g.ip}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="page-section">
            <div class="grid-2">
                ${createChartHTML('chart-ran-throughput', '📈 RAN Throughput (Mbps)')}
                ${createChartHTML('chart-ran-ues', '📱 Connected UEs Over Time')}
            </div>
        </div>
    `;

    document.getElementById('page-container').innerHTML = html;

    createChart('chart-ran-throughput', metrics.throughputHistory, { color: COLORS.blue, yLabel: 'Mbps' });
    createChart('chart-ran-ues', metrics.ueCountHistory, { color: COLORS.green, yLabel: 'UEs' });
}
