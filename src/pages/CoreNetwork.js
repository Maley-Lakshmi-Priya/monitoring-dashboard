/* ===== CORE NETWORK PAGE ===== */

function renderCoreNetworkPage() {
    const nodes = topologyData.coreNetwork;

    const html = `
        <div class="page-section">
            <h2 class="section-title">⚙️ Network Functions Overview</h2>
            <div class="metrics-grid">
                ${createMetricsCard({ label: 'Total NFs', value: nodes.length, unit: 'functions', trend: 'stable', change: 'All registered', color: 'blue', icon: '🔧' })}
                ${createMetricsCard({ label: 'Online', value: nodes.filter(n => n.status === STATUS.ONLINE).length, unit: 'NFs', trend: 'up', change: 'Healthy', color: 'green', icon: '✅' })}
                ${createMetricsCard({ label: 'Warnings', value: nodes.filter(n => n.status === STATUS.WARNING).length, unit: 'NFs', trend: 'stable', change: 'Monitor', color: 'orange', icon: '⚠️' })}
                ${createMetricsCard({ label: 'Offline', value: nodes.filter(n => n.status === STATUS.OFFLINE).length, unit: 'NFs', trend: 'stable', change: '—', color: 'red', icon: '❌' })}
            </div>
        </div>

        <div class="page-section">
            <h2 class="section-title">📋 Network Function Details</h2>
            <div class="panel">
                <div class="panel-body" style="padding:0;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>NF</th>
                                <th>Full Name</th>
                                <th>IP Address</th>
                                <th>CPU</th>
                                <th>Memory</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${nodes.map(n => `
                                <tr>
                                    <td><strong style="color:var(--accent-blue)">${n.name}</strong></td>
                                    <td>${n.fullName}</td>
                                    <td class="mono">${n.ip}</td>
                                    <td>
                                        <div style="display:flex;align-items:center;gap:8px;">
                                            <div class="progress-bar" style="width:80px;">
                                                <div class="progress-fill ${n.cpu > 70 ? 'red' : n.cpu > 40 ? 'orange' : 'green'}" style="width:${n.cpu}%"></div>
                                            </div>
                                            <span style="font-size:0.75rem;color:var(--text-secondary)">${n.cpu}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style="display:flex;align-items:center;gap:8px;">
                                            <div class="progress-bar" style="width:80px;">
                                                <div class="progress-fill ${n.memory > 70 ? 'red' : n.memory > 40 ? 'orange' : 'blue'}" style="width:${n.memory}%"></div>
                                            </div>
                                            <span style="font-size:0.75rem;color:var(--text-secondary)">${n.memory}%</span>
                                        </div>
                                    </td>
                                    <td>${createStatusBadge(n.status)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="page-section">
            <h2 class="section-title">🔗 Interface Connections</h2>
            <div class="panel">
                <div class="panel-body" style="padding:0;">
                    <table class="data-table">
                        <thead><tr><th>From</th><th>To</th><th>Protocol / Interface</th><th>Status</th></tr></thead>
                        <tbody>
                            ${topologyData.connections.map(c => `
                                <tr>
                                    <td><strong>${c.from.toUpperCase()}</strong></td>
                                    <td><strong>${c.to.toUpperCase()}</strong></td>
                                    <td class="mono">${c.protocol}</td>
                                    <td>${createStatusBadge(STATUS.ONLINE)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    document.getElementById('page-container').innerHTML = html;
}
