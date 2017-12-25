import cheerio from 'cheerio-without-node-native'

module.exports = (hospital, html) => {
    const $ = cheerio.load(html);
    var clinics = $('tr', hospital.csTableSelector).map((i, tr) => {
        if(i == 0) {
          return {}
        }

        // Get all td tags of tr
        var tds = $('td', tr)
        
        return {
          clinicNo: $(tds.get(hospital.csFieldIds[0])).text(),
          division: $(tds.get(hospital.csFieldIds[1])).text(),
          doctor: $(tds.get(hospital.csFieldIds[2])).text(),
          visitNo: $(tds.get(hospital.csFieldIds[3])).text()
        }
    })
    clinics.splice(0, 1)
    return clinics
}
