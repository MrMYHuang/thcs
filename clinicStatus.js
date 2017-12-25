module.exports = (hospital, html) => {
    var loadClinicStatus
    switch(hospital.csTableType) {
        case 0: loadClinicStatus = require('./clinicStatusLoaders/type0.js'); break;
    }
    return loadClinicStatus(hospital, html)
}
