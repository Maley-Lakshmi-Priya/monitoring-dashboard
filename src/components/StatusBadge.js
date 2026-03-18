/* ===== STATUS BADGE COMPONENT ===== */

function createStatusBadge(status) {
    const labels = { online: 'Online', offline: 'Offline', warning: 'Warning' };
    return `
        <span class="status-badge ${status}">
            <span class="status-indicator"></span>
            ${labels[status] || status}
        </span>
    `;
}
