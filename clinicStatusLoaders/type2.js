import cheerio from 'cheerio-without-node-native'

module.exports = (hospital, html) => {
    const $ = cheerio.load(html);
    var clinics = $('div', '.p3_tab_bottom').map((i, tr) => {
        if(tr.attribs.class != 'p3_tab_h2' && tr.attribs.class != 'p3_tab_h4') {
          return null
        }

        // Get all td tags of tr
        var tds = $('div', tr)
        
        return {
          clinicNo: $(tds.get(hospital.csFieldIds[0])).text().replace(/^\s+|\s+$/g, ""),
          division: $(tds.get(hospital.csFieldIds[1])).text().replace(/^\s+|\s+$/g, ""),
          doctor: $(tds.get(hospital.csFieldIds[2])).text().replace(/^\s+|\s+$/g, ""),
          visitNo: $(tds.get(hospital.csFieldIds[3])).text().replace(/^\s+|\s+$/g, "")
        }
    })
    return clinics
}
