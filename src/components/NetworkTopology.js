/* ===== NETWORK TOPOLOGY COMPONENT ===== */

function createNetworkTopology(data) {
    const cnNodes = data.coreNetwork;
    const ranNodes = data.radioAccess;

    // Layout positions (percentage-based)
    const positions = {
        // RAN layer (left)
        gnb1: { x: 8, y: 20 },
        gnb2: { x: 8, y: 50 },
        gnb3: { x: 8, y: 80 },
        // Core Network (spread across)
        amf: { x: 35, y: 40 },
        smf: { x: 55, y: 25 },
        upf: { x: 75, y: 25 },
        nrf: { x: 55, y: 65 },
        ausf: { x: 35, y: 75 },
        udm: { x: 55, y: 85 },
        udr: { x: 75, y: 85 },
    };

    const allNodes = [...ranNodes, ...cnNodes];

    let nodesHTML = allNodes.map(node => {
        const pos = positions[node.id] || { x: 50, y: 50 };
        return `
            <div class="topology-node" style="left:${pos.x}%; top:${pos.y}%;" title="${node.fullName || node.type || ''}">
                <div class="node-circle ${node.status}">${node.name}</div>
                <div class="node-label">${node.fullName || node.type || ''}</div>
                <div class="node-ip">${node.ip}</div>
            </div>
        `;
    }).join('');

    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">🌐 Network Topology</span>
                <div style="display:flex;gap:16px;font-size:0.7rem;">
                    <span style="display:flex;align-items:center;gap:4px;"><span class="status-dot online" style="width:6px;height:6px;"></span> Online</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent-orange);"></span> Warning</span>
                    <span style="display:flex;align-items:center;gap:4px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent-red);"></span> Offline</span>
                </div>
            </div>
            <div class="panel-body">
                <div class="topology-container" id="topology-canvas">
                    <svg width="100%" height="100%" style="position:absolute;top:0;left:0;pointer-events:none;" id="topology-lines"></svg>
                    ${nodesHTML}
                </div>
            </div>
        </div>
    `;
}

function drawTopologyLines(connections, positions) {
    const svg = document.getElementById('topology-lines');
    if (!svg) return;
    const container = document.getElementById('topology-canvas');
    if (!container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    let lines = '';

    connections.forEach(conn => {
        const from = positions[conn.from];
        const to = positions[conn.to];
        if (!from || !to) return;

        const x1 = (from.x / 100) * w + 26;
        const y1 = (from.y / 100) * h + 26;
        const x2 = (to.x / 100) * w + 26;
        const y2 = (to.y / 100) * h + 26;

        lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,212,255,0.2)" stroke-width="1.5" stroke-dasharray="4,4"/>`;

        // Protocol label at midpoint
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        lines += `<text x="${mx}" y="${my - 6}" fill="rgba(255,255,255,0.25)" font-size="8" text-anchor="middle" font-family="Inter,sans-serif">${conn.protocol}</text>`;
    });

    svg.innerHTML = lines;
}

const topologyPositions = {
    gnb1: { x: 8, y: 20 },
    gnb2: { x: 8, y: 50 },
    gnb3: { x: 8, y: 80 },
    amf: { x: 35, y: 40 },
    smf: { x: 55, y: 25 },
    upf: { x: 75, y: 25 },
    nrf: { x: 55, y: 65 },
    ausf: { x: 35, y: 75 },
    udm: { x: 55, y: 85 },
    udr: { x: 75, y: 85 },
};
