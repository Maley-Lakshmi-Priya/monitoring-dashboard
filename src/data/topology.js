/* ===== NETWORK TOPOLOGY DATA ===== */
/* Mirrors the OAI docker-compose.yaml network layout */

const topologyData = {
    coreNetwork: [
        { id: 'nrf', name: 'NRF', fullName: NF_NAMES.NRF, ip: '192.168.70.130', status: STATUS.ONLINE, cpu: 12, memory: 28 },
        { id: 'amf', name: 'AMF', fullName: NF_NAMES.AMF, ip: '192.168.70.132', status: STATUS.ONLINE, cpu: 35, memory: 42 },
        { id: 'smf', name: 'SMF', fullName: NF_NAMES.SMF, ip: '192.168.70.133', status: STATUS.ONLINE, cpu: 22, memory: 35 },
        { id: 'upf', name: 'UPF', fullName: NF_NAMES.UPF, ip: '192.168.70.134', status: STATUS.ONLINE, cpu: 58, memory: 61 },
        { id: 'udr', name: 'UDR', fullName: NF_NAMES.UDR, ip: '192.168.70.136', status: STATUS.ONLINE, cpu: 8, memory: 22 },
        { id: 'udm', name: 'UDM', fullName: NF_NAMES.UDM, ip: '192.168.70.137', status: STATUS.ONLINE, cpu: 10, memory: 25 },
        { id: 'ausf', name: 'AUSF', fullName: NF_NAMES.AUSF, ip: '192.168.70.138', status: STATUS.WARNING, cpu: 45, memory: 55 },
    ],
    radioAccess: [
        { id: 'gnb1', name: 'gNB-1', type: 'Macro Cell', band: 'n78', prb: 106, ip: '192.168.70.140', status: STATUS.ONLINE, connectedUEs: 42, throughputDL: 820, throughputUL: 195, frequency: '3.5 GHz' },
        { id: 'gnb2', name: 'gNB-2', type: 'Small Cell', band: 'n78', prb: 51, ip: '192.168.70.141', status: STATUS.ONLINE, connectedUEs: 18, throughputDL: 410, throughputUL: 98, frequency: '3.5 GHz' },
        { id: 'gnb3', name: 'gNB-3', type: 'Macro Cell', band: 'n78', prb: 106, ip: '192.168.70.142', status: STATUS.OFFLINE, connectedUEs: 0, throughputDL: 0, throughputUL: 0, frequency: '3.5 GHz' },
    ],
    connections: [
        { from: 'gnb1', to: 'amf', protocol: 'NGAP' },
        { from: 'gnb2', to: 'amf', protocol: 'NGAP' },
        { from: 'gnb3', to: 'amf', protocol: 'NGAP' },
        { from: 'amf', to: 'smf', protocol: 'N11' },
        { from: 'amf', to: 'ausf', protocol: 'N12' },
        { from: 'smf', to: 'upf', protocol: 'N4/PFCP' },
        { from: 'amf', to: 'nrf', protocol: 'NRF SBI' },
        { from: 'smf', to: 'nrf', protocol: 'NRF SBI' },
        { from: 'ausf', to: 'udm', protocol: 'N13' },
        { from: 'udm', to: 'udr', protocol: 'N35' },
    ]
};
