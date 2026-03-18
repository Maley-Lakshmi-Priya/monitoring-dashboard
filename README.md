# 5G Service-Based Architecture (SBA) Monitoring Dashboard

A professional-grade observability platform designed for real-time monitoring of 5G Standalone (SA) network infrastructures. This dashboard centralizes critical telemetry from the 5G Core (5GC) and Radio Access Network (RAN) into a high-performance, NOC-optimized interface.

🔗 **Live Deployment:** (https://maley-lakshmi-priya.github.io/5g-monitoring-dashboard/)

---

##  Operational Overview

This solution provides granular visibility into the 5G ecosystem, enabling network engineers to maintain strict Service Level Agreements (SLAs) and Quality of Service (QoS).

### Core Network Observability
* **Network Function (NF) Status:** Real-time health tracking for AMF (Access and Mobility Management), SMF (Session Management), and UPF (User Plane Function).
* **Subscriber Management:** Detailed oversight of User Equipment (UE) attachment states and active PDU session density.
* **Topology Visualization:** Mapping the interconnection between the User Plane and Control Plane components.

### RAN & Performance Telemetry
* **Radio Access Metrics:** Live monitoring of gNodeB throughput, signal-to-noise ratio (SNR), and cell capacity.
* **Fault Management:** Automated alerting engine that triggers based on latency, packet loss, and resource utilization spikes.
* **Performance Analysis:** Visualization of downlink/uplink traffic patterns and session latency.

---

## 🛠️ Technical Architecture

The dashboard is engineered as a lightweight, low-latency static application to ensure high availability and rapid data rendering without heavy framework overhead.

* **Frontend:** HTML5 and CSS3 featuring a custom, responsive Dark-Mode NOC theme.
* **Logic Engine:** Vanilla JavaScript (ES6+) for reactive UI updates, page routing, and metric processing.
* **Data Configuration:** Thresholds and network limits managed via `dashboard.config.json` for rapid environment tuning.
* **Deployment Pipeline:** Automated CI/CD integration through Vercel.

---

## 📊 Monitoring Logic & SLAs

The dashboard evaluates network health using specific performance thresholds to ensure 5G reliability:

* **Latency (RTT):** Monitored for URLLC performance; warnings trigger at 10ms with critical alerts at 50ms.
* **Packet Reliability:** Continuous tracking to prevent VoNR call drops; critical thresholds set at 2.0% packet loss.
* **Resource Utilization:** Real-time signaling congestion monitoring; CPU and Memory alerts trigger above 90% load.

---

## 🚀 Getting Started

Since this is a static web application, no local server environment or external dependencies are required.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Maley-Lakshmi-Priya/5g-monitoring-dashboard.git](https://github.com/Maley-Lakshmi-Priya/5g-monitoring-dashboard.git)
    ```
2.  **Launch:**
    Open `index.html` in any modern web browser to view the dashboard.

---

**Developed by [Maley Lakshmi Priya](https://github.com/Maley-Lakshmi-Priya)** *Specializing in 5G Infrastructure, Network Observability, and Cloud-Native Networking.*
