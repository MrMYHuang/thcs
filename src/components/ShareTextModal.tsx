import React from 'react';
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonModal, IonToggle } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Globals from '../Globals';
import * as qrcode from 'qrcode';

interface Props {
  showModal: boolean;
  text: string;
  finish: Function;
  settings: any;
}

interface PageProps extends Props, RouteComponentProps<{
  tab: string;
  path: string;
}> { }

interface State {
  isAppSettingsExport: Array<boolean>;
}

class _ShareTextModal extends React.Component<PageProps, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      isAppSettingsExport: Array<boolean>(Object.keys(Globals.appSettings).length)
    }
  }

  updateQrCode(isAppSettingsExport: boolean[]) {
    const appSettingsExport = Object.keys(Globals.appSettings).filter((key, i) => isAppSettingsExport[i]).map((key, i) => {return {key: key, val: this.props.settings[key]};});
    let appSettingsString: string | null = appSettingsExport.map(keyVal => `${keyVal.key}=${+keyVal.val}`).join(',');
    appSettingsString = appSettingsString !== '' ? `settings=${appSettingsString}` : null;
    let appUrl = this.props.text;
    const hasQueryString = /\?/.test(appUrl);
    if (appSettingsString) {
      appUrl += hasQueryString ? `&${appSettingsString}` : `?${appSettingsString}`;
    }
    
    Globals.copyToClipboard(appUrl);
    const qrcCanvas = document.getElementById('qrcCanvas');
    qrcode.toCanvas(qrcCanvas, appUrl);
    return qrcCanvas;
  }

  render() {
    return (
      <IonModal
        isOpen={this.props.showModal}
        swipeToClose={true}
        //presentingElement={router || undefined}
        onDidPresent={() => {
          let isAppSettingsExport: Array<boolean> = [];
          for (let i = 0; i < this.state.isAppSettingsExport.length; i++) {
            isAppSettingsExport.push(false);
          }
          this.updateQrCode(isAppSettingsExport);
          this.setState({isAppSettingsExport: isAppSettingsExport});
        }}
        onDidDismiss={() => this.props.finish()}>
        <IonContent>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
            <div>
              <IonLabel className='uiFont'>此頁 app 連結已複製至剪貼簿！</IonLabel>
            </div>
            <div>
              <IonLabel className='uiFont'>也可以使用 QR Code 分享:</IonLabel>
            </div>
            <div style={{ flexGrow: 1, flexShrink: 0, display: 'flex', alignItems: 'center', margin: 10 }}>
              <canvas id='qrcCanvas' width='500' height='500' style={{ margin: '0px auto' }} />
            </div>
            <div>
              <IonLabel className='uiFont'>包括 app 設定:</IonLabel>
              <IonList>
                {
                  Object.keys(Globals.appSettings).map((key, i) =>
                    <IonItem key={`appSettingExportItem_${i}`}>
                      <IonLabel className='ion-text-wrap uiFont'>{Globals.appSettings[key]}</IonLabel>
                      <IonToggle slot='end' onIonChange={e => {
                        const isAppSettingsExport =  this.state.isAppSettingsExport;
                        isAppSettingsExport[i] = e.detail.checked;
                        this.updateQrCode(isAppSettingsExport);
                        this.setState({isAppSettingsExport: isAppSettingsExport});
                      }} />
                    </IonItem>
                  )
                }
              </IonList>
            </div>
            <div>
              <IonButton fill='outline' shape='round' size='large' onClick={() => this.props.finish()}>關閉</IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    );
  }
};

const mapStateToProps = (state: any /*, ownProps*/) => {
  return {
    settings: state.settings,
  }
};

//const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
)(_ShareTextModal);