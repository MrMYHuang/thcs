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
          clinicNo: $(tds.get(hospital.csFieldIds[0])).text().replace(/^\s+|\s+$/g, ""),
          division: $(tds.get(hospital.csFieldIds[1])).text().replace(/^\s+|\s+$/g, ""),
          doctor: $(tds.get(hospital.csFieldIds[2])).text().replace(/^\s+|\s+$/g, ""),
          visitNo: $(tds.get(hospital.csFieldIds[3])).text().replace(/^\s+|\s+$/g, "")
        }
    })
    clinics.splice(0, 1)
    return clinics
}
