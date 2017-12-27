module.exports = {
    name: '基隆醫院',
    clinicStatusUrl: 'http://netreg.kln.mohw.gov.tw/Outpatient.Web/outpatient_data.aspx',
    csTableType: 0,
    csTableEnc: 'utf-8',
    csTableSelector: '#gvDoctor',
    // Fields: {clinicNo, division, doctor, visitNo}
    csFieldIds: [3, 2, 0, 4]
}
