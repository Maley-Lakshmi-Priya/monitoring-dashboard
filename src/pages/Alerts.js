/* ===== ALERTS PAGE ===== */

function renderAlertsPage() {
    const criticalCount = alertsData.filter(a => a.severity === 'critical').length;
    const warningCount = alertsData.filter(a => a.severity === 'warning').length;
    const infoCount = alertsData.filter(a => a.severity === 'info').length;
    const unackCount = alertsData.filter(a => !a.acknowledged).length;

    const html = `
        <div class="page-section">
            <h2 class="section-title">🚨 Alerts Overview</h2>
            <div class="metrics-grid">
                ${createMetricsCard({ label: 'Critical', value: criticalCount, unit: 'alerts', trend: criticalCount > 0 ? 'up' : 'stable', change: criticalCount > 0 ? 'Action needed' : 'Clear', color: 'red', icon: '🔴' })}
                ${createMetricsCard({ label: 'Warnings', value: warningCount, unit: 'alerts', trend: 'stable', change: 'Monitor', color: 'orange', icon: '🟡' })}
                ${createMetricsCard({ label: 'Info', value: infoCount, unit: 'events', trend: 'stable', change: '—', color: 'blue', icon: 'ℹ️' })}
                ${createMetricsCard({ label: 'Unacknowledged', value: unackCount, unit: 'pending', trend: unackCount > 0 ? 'up' : 'stable', change: unackCount > 0 ? 'Review' : 'All clear', color: 'red', icon: '👁' })}
            </div>
        </div>

        <div class="page-section">
            <h2 class="section-title">📜 Alert Log</h2>
            <div class="panel">
                <div class="panel-body" style="padding:0;">
                    ${alertsData.map(a => `
                        <div class="alert-item" style="opacity:${a.acknowledged ? '0.6' : '1'}">
                            <div class="alert-icon ${a.severity}">
                                ${a.severity === 'critical' ? '🔴' : a.severity === 'warning' ? '🟡' : 'ℹ️'}
                            </div>
                            <div class="alert-content">
                                <div class="alert-title" style="display:flex;align-items:center;gap:8px;">
                                    ${a.title}
                                    ${!a.acknowledged ? '<span style="background:var(--accent-red);color:white;font-size:9px;padding:2px 6px;border-radius:10px;font-weight:700;">NEW</span>' : ''}
                                </div>
                                <div class="alert-desc">${a.desc}</div>
                                <div style="margin-top:6px;font-size:0.7rem;color:var(--text-muted);">Source: <strong>${a.source}</strong></div>
                            </div>
                            <div class="alert-time">${timeAgo(a.time)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.getElementById('page-container').innerHTML = html;
}
