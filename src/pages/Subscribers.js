/* ===== SUBSCRIBERS PAGE ===== */

function renderSubscribersPage() {
    const subs = subscribersData;
    const onlineCount = subs.filter(s => s.status === STATUS.ONLINE).length;
    const offlineCount = subs.filter(s => s.status === STATUS.OFFLINE).length;
    const totalSessions = subs.reduce((s, u) => s + u.pduSessions, 0);

    const html = `
        <div class="page-section">
            <h2 class="section-title">👥 Subscriber Overview</h2>
            <div class="metrics-grid">
                ${createMetricsCard({ label: 'Total Subscribers', value: subs.length, unit: 'registered', trend: 'stable', change: '—', color: 'blue', icon: '👥' })}
                ${createMetricsCard({ label: 'Online', value: onlineCount, unit: 'connected', trend: 'up', change: '+2', color: 'green', icon: '🟢' })}
                ${createMetricsCard({ label: 'Offline', value: offlineCount, unit: 'disconnected', trend: 'stable', change: '—', color: 'red', icon: '🔴' })}
                ${createMetricsCard({ label: 'PDU Sessions', value: totalSessions, unit: 'active', trend: 'up', change: '+4', color: 'orange', icon: '🔗' })}
            </div>
        </div>

        <div class="page-section">
            <h2 class="section-title">📋 Subscriber Table</h2>
            <div class="panel">
                <div class="panel-body" style="padding:0; overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>IMSI</th>
                                <th>MSISDN</th>
                                <th>Status</th>
                                <th>IP Address</th>
                                <th>gNB</th>
                                <th>PDU Sessions</th>
                                <th>DL / UL</th>
                                <th>QoS</th>
                                <th>Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${subs.map(s => `
                                <tr>
                                    <td class="mono">${s.imsi}</td>
                                    <td>${s.msisdn}</td>
                                    <td>${createStatusBadge(s.status)}</td>
                                    <td class="mono">${s.ip}</td>
                                    <td><strong>${s.gnb}</strong></td>
                                    <td style="text-align:center">${s.pduSessions}</td>
                                    <td>${s.throughputDL > 0 ? formatThroughput(s.throughputDL) + ' / ' + formatThroughput(s.throughputUL) : '—'}</td>
                                    <td class="mono">${s.qosFlow}</td>
                                    <td style="color:var(--text-secondary);font-size:0.75rem;">${timeAgo(s.registeredAt)}</td>
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
