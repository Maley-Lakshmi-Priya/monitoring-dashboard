/* ===== SUBSCRIBER DATA ===== */

const subscribersData = [
    { imsi: '001010000000001', msisdn: '+1-555-0101', status: STATUS.ONLINE, ip: '10.0.0.2', gnb: 'gNB-1', pduSessions: 2, throughputDL: 45.2, throughputUL: 12.8, qosFlow: '5QI-9', registeredAt: new Date(Date.now() - 7200000) },
    { imsi: '001010000000002', msisdn: '+1-555-0102', status: STATUS.ONLINE, ip: '10.0.0.3', gnb: 'gNB-1', pduSessions: 1, throughputDL: 120.5, throughputUL: 35.1, qosFlow: '5QI-1', registeredAt: new Date(Date.now() - 3600000) },
    { imsi: '001010000000003', msisdn: '+1-555-0103', status: STATUS.ONLINE, ip: '10.0.0.4', gnb: 'gNB-2', pduSessions: 3, throughputDL: 78.9, throughputUL: 22.3, qosFlow: '5QI-5', registeredAt: new Date(Date.now() - 1800000) },
    { imsi: '001010000000004', msisdn: '+1-555-0104', status: STATUS.OFFLINE, ip: '—', gnb: '—', pduSessions: 0, throughputDL: 0, throughputUL: 0, qosFlow: '—', registeredAt: new Date(Date.now() - 86400000) },
    { imsi: '001010000000005', msisdn: '+1-555-0105', status: STATUS.ONLINE, ip: '10.0.0.6', gnb: 'gNB-1', pduSessions: 1, throughputDL: 200.1, throughputUL: 55.4, qosFlow: '5QI-1', registeredAt: new Date(Date.now() - 600000) },
    { imsi: '001010000000006', msisdn: '+1-555-0106', status: STATUS.WARNING, ip: '10.0.0.7', gnb: 'gNB-2', pduSessions: 1, throughputDL: 5.2, throughputUL: 1.1, qosFlow: '5QI-9', registeredAt: new Date(Date.now() - 5400000) },
    { imsi: '001010000000007', msisdn: '+1-555-0107', status: STATUS.ONLINE, ip: '10.0.0.8', gnb: 'gNB-1', pduSessions: 2, throughputDL: 95.0, throughputUL: 28.7, qosFlow: '5QI-5', registeredAt: new Date(Date.now() - 900000) },
    { imsi: '001010000000008', msisdn: '+1-555-0108', status: STATUS.OFFLINE, ip: '—', gnb: '—', pduSessions: 0, throughputDL: 0, throughputUL: 0, qosFlow: '—', registeredAt: new Date(Date.now() - 172800000) },
    { imsi: '001010000000009', msisdn: '+1-555-0109', status: STATUS.ONLINE, ip: '10.0.0.10', gnb: 'gNB-2', pduSessions: 1, throughputDL: 150.3, throughputUL: 42.6, qosFlow: '5QI-1', registeredAt: new Date(Date.now() - 2400000) },
    { imsi: '001010000000010', msisdn: '+1-555-0110', status: STATUS.ONLINE, ip: '10.0.0.11', gnb: 'gNB-1', pduSessions: 2, throughputDL: 67.8, throughputUL: 18.9, qosFlow: '5QI-9', registeredAt: new Date(Date.now() - 4200000) },
];
