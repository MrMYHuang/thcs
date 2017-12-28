module.exports = (hospital, html) => {
    var loadClinicStatus
    switch(hospital.csTableType) {
        case 0: loadClinicStatus = require('./clinicStatusLoaders/type0.js'); break;
        case 2: loadClinicStatus = require('./clinicStatusLoaders/type2.js'); break;
        case 3: loadClinicStatus = require('./clinicStatusLoaders/type3.js'); break;
    }
    return loadClinicStatus(hospital, html)
}
