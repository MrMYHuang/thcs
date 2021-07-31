module.exports = {
    name: '高醫醫院',
    clinicStatusUrl: 'http://www.kmuh.org.tw/KMUHWeb/Pages/P02Register/OPDSeqQuery/Index.aspx',
    csTableType: 3,
    csTableEnc: 'utf-8',
    csTableSelector: '#gvClinicStatus',
    // Fields: {clinicNo, division, doctor, visitNo}
    csFieldIds: [0, 0, 1, 2]
}
