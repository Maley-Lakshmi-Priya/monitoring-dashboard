/* ===== METRICS CARD COMPONENT ===== */

function createMetricsCard({ label, value, unit, trend, change, color, icon }) {
    const trendArrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    return `
        <div class="metrics-card ${color}">
            <div class="card-header">
                <span class="card-label">${label}</span>
                <div class="card-icon ${color}">${icon}</div>
            </div>
            <div class="card-value">${value}<span class="card-unit"> ${unit}</span></div>
            <div class="card-trend ${trend}">
                <span>${trendArrow}</span>
                <span>${change}</span>
            </div>
        </div>
    `;
}
