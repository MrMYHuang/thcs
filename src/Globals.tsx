import axios from 'axios'
import iconv from 'iconv-lite-myh';
import { isPlatform, IonLabel } from '@ionic/react';
import { Settings } from './models/Settings';
import counties from './js/counties';
import { Hospital } from './models/Hospital';
import { Clinic } from './models/Clinic';
var getClinicStatus = require('./js/clinicStatus');

const pwaUrl = process.env.PUBLIC_URL || '';

const axiosInstance = axios.create({
  timeout: 8000,
});

async function fetchClinics(hospital: Hospital, dispatch: Function) {
  await axios.get(hospital.clinicStatusUrl, {
    responseType: 'arraybuffer',
  }).then(async (res) => {
    var currTime = new Date()
    await dispatch({
      type: "TMP_SET_KEY_VAL",
      key: "dbUpdateDate",
      val: currTime.toLocaleDateString() + " " + currTime.toLocaleTimeString()
    })

    var data = (iconv as any).decode(Buffer.from(res.data), hospital.csTableEnc);

    var clinics = getClinicStatus(hospital, data).toArray() as Clinic[];
    dispatch({
      type: "TMP_SET_KEY_VAL",
      key: "clinics",
      val: clinics
    })
  })
}

let log = '';

async function clearAppData() {
  localStorage.clear();
}

//const electronBackendApi: any = (window as any).electronBackendApi;

const consoleLog = console.log.bind(console);
const consoleError = console.error.bind(console);

function getLog() {
  return log;
}

function enableAppLog() {
  console.log = function () {
    log += '----- Info ----\n';
    log += (Array.from(arguments)) + '\n';
    consoleLog.apply(console, arguments as any);
  };

  console.error = function () {
    log += '----- Error ----\n';
    log += (Array.from(arguments)) + '\n';
    consoleError.apply(console, arguments as any);
  };
}

function disableAppLog() {
  log = '';
  console.log = consoleLog;
  console.error = consoleError;
}

function copyToClipboard(text: string) {
  try {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'clipboard-read' } as any).then(() => {
        navigator.clipboard.writeText(text);
      });
    } else {
      navigator.clipboard && navigator.clipboard.writeText(text);
    }
  } catch (error) {
    console.error(error);
  }
}

function isMacCatalyst() {
  return isPlatform('ios') && navigator.platform === 'MacIntel';
}

const checkServiceWorkerInterval = 20;
let serviceWorkerLoaded = false;
let _serviceWorkerReg: ServiceWorkerRegistration;
async function getServiceWorkerReg() {
  if (serviceWorkerLoaded) {
    return _serviceWorkerReg;
  }

  return new Promise<ServiceWorkerRegistration>((ok, fail) => {
    let waitTime = 0;
    const waitLoading = setInterval(() => {
      if (navigator.serviceWorker.controller != null) {
        clearInterval(waitLoading);
        ok(_serviceWorkerReg);
      } else if (waitTime > 1e3 * 10) {
        clearInterval(waitLoading);
        fail('getServiceWorkerReg timeout!');
      }
      waitTime += checkServiceWorkerInterval;
    }, checkServiceWorkerInterval);
  });
}
function setServiceWorkerReg(serviceWorkerReg: ServiceWorkerRegistration) {
  _serviceWorkerReg = serviceWorkerReg;
}

let _serviceWorkerRegUpdated: ServiceWorkerRegistration;
function getServiceWorkerRegUpdated() {
  return _serviceWorkerRegUpdated;
}
function setServiceWorkerRegUpdated(serviceWorkerRegUpdated: ServiceWorkerRegistration) {
  _serviceWorkerRegUpdated = serviceWorkerRegUpdated;
}

const Globals = {
  pwaUrl,
  counties: counties as { name: string, hospitals: Hospital[] }[],
  axiosInstance,
  fetchClinics,
  storeFile: 'ThcsSettings.json',
  getLog,
  enableAppLog,
  disableAppLog,
  appSettings: {
    'theme': '佈景主題',
    'uiFontSize': 'UI字型大小',
    'textFontSize': '內容文字大小',
  } as Record<string, string>,
  fetchErrorContent: (
    <div className='contentCenter'>
      <IonLabel>
        <div>
          <div>連線失敗!</div>
          <div style={{ fontSize: 'var(--ui-font-size)', paddingTop: 24 }}>請嘗試點擊右上方的重新讀取按鈕。如果問題持續發生，請執行<a href={`/${pwaUrl}/settings`} target="_self">設定頁</a>的 app 異常回報功能。</div>
        </div>
      </IonLabel>
    </div>
  ),
  updateApp: () => {
    return new Promise(async resolve => {
      navigator.serviceWorker.getRegistrations().then(async regs => {
        const hasUpdates = await Promise.all(regs.map(reg => (reg.update() as any).then((newReg: ServiceWorkerRegistration) => {
          return newReg.installing !== null || newReg.waiting !== null;
        })));
        resolve(hasUpdates.reduce((prev, curr) => prev || curr, false));
      });
    });
  },
  updateCssVars: (settings: Settings) => {
    document.documentElement.style.cssText = `--text-font-size: ${settings.textFontSize}px; --ui-font-size: ${settings.uiFontSize}px;`
  },
  isMacCatalyst,
  isTouchDevice: () => {
    return (isPlatform('ios') && !isMacCatalyst()) || isPlatform('android');
  },
  clearAppData,
  copyToClipboard,
  setServiceWorkerReg,
  getServiceWorkerReg,
  setServiceWorkerRegUpdated,
  getServiceWorkerRegUpdated,
};

export default Globals;
