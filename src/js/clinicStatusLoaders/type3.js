import cheerio from 'cheerio-without-node-native'

const f = (hospital, html) => {
    const $ = cheerio.load(html);
    var clinics = $('tr', '#table1').map((i, tr) => {
        // Get all td tags of tr
        var tds = $('span', tr)
        
        return {
          clinicNo: $(tds.get(hospital.csFieldIds[0])).text().replace(/^\s+|\s+$/g, ""),
          division: $(tds.get(hospital.csFieldIds[1])).text().replace(/^\s+|\s+$/g, ""),
          doctor: $(tds.get(hospital.csFieldIds[2])).text().replace(/^\s+|\s+$/g, ""),
          visitNo: $(tds.get(hospital.csFieldIds[3])).text().replace(/^\s+|\s+$/g, "")
        }
    })
    return clinics
}

export default f;
