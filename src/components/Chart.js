/* ===== CHART COMPONENT ===== */
/* Lightweight canvas-based line chart — no external libraries */

function createChart(canvasId, data, options = {}) {
    const {
        color = COLORS.blue,
        fillOpacity = 0.1,
        lineWidth = 2,
        showDots = false,
        showGrid = true,
        yLabel = '',
    } = options;

    setTimeout(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // High-DPI support
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const padding = { top: 20, right: 20, bottom: 30, left: 50 };
        const chartW = w - padding.left - padding.right;
        const chartH = h - padding.top - padding.bottom;

        const values = data.map(d => d.value);
        const minVal = Math.min(...values) * 0.9;
        const maxVal = Math.max(...values) * 1.1;
        const range = maxVal - minVal || 1;

        ctx.clearRect(0, 0, w, h);

        // Grid lines
        if (showGrid) {
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const y = padding.top + (chartH / 4) * i;
                ctx.beginPath();
                ctx.moveTo(padding.left, y);
                ctx.lineTo(w - padding.right, y);
                ctx.stroke();

                // Y-axis labels
                const val = maxVal - (range / 4) * i;
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.font = '10px Inter, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(val.toFixed(1), padding.left - 8, y + 4);
            }
        }

        // X-axis labels
        const labelInterval = Math.max(1, Math.floor(data.length / 6));
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        data.forEach((d, i) => {
            if (i % labelInterval === 0) {
                const x = padding.left + (chartW / (data.length - 1)) * i;
                ctx.fillText(d.time, x, h - 8);
            }
        });

        // Data points
        const points = data.map((d, i) => ({
            x: padding.left + (chartW / (data.length - 1)) * i,
            y: padding.top + chartH - ((d.value - minVal) / range) * chartH,
        }));

        // Fill area
        ctx.beginPath();
        ctx.moveTo(points[0].x, padding.top + chartH);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        gradient.addColorStop(0, color + '30');
        gradient.addColorStop(1, color + '00');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Dots
        if (showDots) {
            points.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });
        }

        // Y-axis label
        if (yLabel) {
            ctx.save();
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.font = '10px Inter, sans-serif';
            ctx.translate(12, padding.top + chartH / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.textAlign = 'center';
            ctx.fillText(yLabel, 0, 0);
            ctx.restore();
        }
    }, 50);
}

function createChartHTML(id, title) {
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">${title}</span>
            </div>
            <div class="panel-body">
                <div class="chart-container">
                    <canvas id="${id}" class="chart-canvas"></canvas>
                </div>
            </div>
        </div>
    `;
}
