import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonRange, IonIcon, IonLabel, IonToggle, IonButton, IonAlert, IonSelect, IonSelectOption, IonToast, withIonLifeCycle } from '@ionic/react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Globals from '../Globals';
import { helpCircle, text, colorPalette, shareSocial, bug, download, informationCircle } from 'ionicons/icons';
import './SettingsPage.css';
import PackageInfos from '../../package.json';
import { Settings } from '../models/Settings';

interface StateProps {
  showClearAlert: boolean;
  showToast: boolean;
  toastMessage: string;
}

interface Props {
  dispatch: Function;
  hasAppLog: boolean;
  theme: number;
  uiFontSize: number;
  settings: Settings;
  voiceURI: string;
  speechRate: number;
  mainVersion: string | null;
  cbetaOfflineDbMode: boolean;
}

interface PageProps extends Props, RouteComponentProps<{
  tab: string;
  path: string;
  label: string;
}> { }

class _SettingsPage extends React.Component<PageProps, StateProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      showClearAlert: false,
      showToast: false,
      toastMessage: '',
    };
  }

  ionViewWillEnter() {
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className='uiFont'>設定</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={shareSocial} slot='start' />
              <IonLabel className='ion-text-wrap uiFont' onClick={async e => {
                const hasUpdate = await Globals.updateApp();

                if (!hasUpdate) {
                  this.setState({ showToast: true, toastMessage: 'App已是最新版' });
                }
              }}>PWA版本: <a href="https://github.com/MrMYHuang/thcs#history" target="_new">{PackageInfos.pwaVersion}</a></IonLabel>
              <IonButton fill='outline' shape='round' slot='end' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={e => {
                this.props.dispatch({
                  type: "TMP_SET_KEY_VAL",
                  key: 'shareTextModal',
                  val: {
                    show: true,
                    text: window.location.origin,
                  },
                });
              }}>分享</IonButton>
            </IonItem>
            <IonItem hidden={!this.props.mainVersion}>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={informationCircle} slot='start' />
              <IonLabel className='ion-text-wrap uiFont'>Backend app版本: {this.props.mainVersion}</IonLabel>
              {/*<IonButton fill='outline' shape='round' slot='end' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={e => {
              }}>分享</IonButton>*/}
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={bug} slot='start' />
              <IonLabel className='ion-text-wrap uiFont'><a href="https://github.com/MrMYHuang/thcs#report" target="_new">啟用app異常記錄</a></IonLabel>
              <IonToggle slot='end' checked={this.props.hasAppLog} onIonChange={e => {
                const isChecked = e.detail.checked;

                if (this.props.hasAppLog === isChecked) {
                  return;
                }

                isChecked ? Globals.enableAppLog() : Globals.disableAppLog();
                this.props.dispatch({
                  type: "SET_KEY_VAL",
                  key: 'hasAppLog',
                  val: isChecked
                });
              }} />
            </IonItem>
            <IonItem hidden={!this.props.hasAppLog}>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={bug} slot='start' />
              <IonLabel className='ion-text-wrap uiFont'>回報 app 異常記錄</IonLabel>
              <IonButton fill='outline' shape='round' slot='end' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={e => {
                window.open(`mailto:myh@live.com?subject=醫診進度異常記錄回報&body=${encodeURIComponent("問題描述(建議填寫)：\n\n瀏覽器：" + navigator.userAgent + "\n\nApp版本：" + PackageInfos.pwaVersion + "\n\nApp設定：" + JSON.stringify(this.props.settings) + "\n\nLog：\n" + Globals.getLog())}`);
              }}>回報</IonButton>
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={download} slot='start' />
              <div className='contentBlock'>
                <div style={{ flexDirection: 'column' }}>
                  <IonLabel className='ion-text-wrap uiFont'>App 設定</IonLabel>
                  <div style={{ textAlign: 'right' }}>
                    <IonButton fill='outline' shape='round' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={async (e) => {
                      const settingsJsonUri = `data:text/json;charset=utf-8,${encodeURIComponent(localStorage.getItem(Globals.storeFile) || '')}`;
                      const a = document.createElement('a');
                      a.href = settingsJsonUri;
                      a.download = Globals.storeFile;
                      a.click();
                      a.remove();
                    }}>匯出</IonButton>
                    <input id='importJsonInput' type='file' accept='.json' style={{ display: 'none' }} onChange={async (ev) => {
                      const file = ev.target.files?.item(0);
                      const fileText = await file?.text() || '';
                      try {
                        // JSON text validation.
                        JSON.parse(fileText);
                        localStorage.setItem(Globals.storeFile, fileText);
                        this.props.dispatch({ type: 'LOAD_SETTINGS' });
                      } catch (e) {
                        console.error(e);
                        console.error(new Error().stack);
                      }
                      (document.getElementById('importJsonInput') as HTMLInputElement).value = '';
                    }} />

                    <IonButton fill='outline' shape='round' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={(e) => {
                      (document.querySelector('#importJsonInput') as HTMLInputElement).click();
                    }}>匯入</IonButton>
                    <IonButton fill='outline' shape='round' size='large' style={{ fontSize: 'var(--ui-font-size)' }} onClick={(e) => {
                      this.setState({ showClearAlert: true });
                    }}>重置</IonButton>
                    <IonAlert
                      cssClass='uiFont'
                      isOpen={this.state.showClearAlert}
                      backdropDismiss={false}
                      onDidPresent={(ev) => {
                      }}
                      header={'重置會還原 app 設定預設值並清除書籤！確定重置？'}
                      buttons={[
                        {
                          text: '取消',
                          cssClass: 'primary uiFont',
                          handler: (value) => {
                            this.setState({
                              showClearAlert: false,
                            });
                          },
                        },
                        {
                          text: '重置',
                          cssClass: 'secondary uiFont',
                          handler: async (value) => {
                            await Globals.clearAppData();
                            this.props.dispatch({ type: 'DEFAULT_SETTINGS' });
                            while (document.body.classList.length > 0) {
                              document.body.classList.remove(document.body.classList.item(0)!);
                            }
                            document.body.classList.toggle(`theme${this.props.theme}`, true);
                            this.setState({ showClearAlert: false, showToast: true, toastMessage: "清除成功!" });
                          },
                        }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={colorPalette} slot='start' />
              <IonLabel className='ion-text-wrap uiFont'>{Globals.appSettings['theme']}</IonLabel>
              <IonSelect slot='end'
                value={+this.props.theme}
                style={{ fontSize: 'var(--ui-font-size)' }}
                interface='popover'
                interfaceOptions={{ cssClass: 'thcsthemes' }}
                onIonChange={e => {
                  const value = +e.detail.value;
                  // Important! Because it can results in rerendering of this component but
                  // store states (this.props) of this component is not updated yet! And IonSelect value will be changed
                  // back to the old value and onIonChange will be triggered again!
                  // Thus, we use this check to ignore this invalid change.
                  if (+this.props.theme === value) {
                    return;
                  }

                  this.props.dispatch({
                    type: "SET_KEY_VAL",
                    key: 'theme',
                    val: value,
                  });
                }}>
                <IonSelectOption className='uiFont cbeta' value={0}>綠底</IonSelectOption>
                <IonSelectOption className='uiFont dark' value={1}>暗色</IonSelectOption>
                <IonSelectOption className='uiFont light' value={2}>亮色</IonSelectOption>
                <IonSelectOption className='uiFont oldPaper' value={3}>舊書</IonSelectOption>
                <IonSelectOption className='uiFont marble' value={4}>大理石</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={text} slot='start' />
              <div className="contentBlock">
                <div style={{ flexDirection: "column" }}>
                  <IonLabel className='ion-text-wrap uiFont'>{Globals.appSettings['uiFontSize']}: {this.props.uiFontSize}</IonLabel>
                  <IonRange min={12} max={32} pin={true} snaps={true} value={this.props.uiFontSize} onIonChange={e => {
                    this.props.dispatch({
                      type: "SET_KEY_VAL",
                      key: 'uiFontSize',
                      val: +e.detail.value,
                    });
                    Globals.updateCssVars(this.props.settings);
                  }} />
                </div>
              </div>
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={text} slot='start' />
              <div className="contentBlock">
                <IonLabel className='ion-text-wrap uiFont'>{Globals.appSettings['textFontSize']}: <span className='textFont'>{this.props.settings.textFontSize}</span></IonLabel>
                <IonRange min={12} max={64} pin={true} snaps={true} value={this.props.settings.textFontSize} onIonChange={e => {
                  this.props.dispatch({
                    type: "SET_KEY_VAL",
                    key: 'textFontSize',
                    val: +e.detail.value,
                  });
                  Globals.updateCssVars(this.props.settings);
                }} />
              </div>
            </IonItem>
            <IonItem>
              <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
              <IonIcon icon={helpCircle} slot='start' />
              <div style={{ fontSize: 'var(--ui-font-size)' }}>
                <div>關於</div>
                <div><a href="https://github.com/MrMYHuang/thcs#web-app" target="_new">程式安裝說明</a></div>
                <div><a href="https://github.com/MrMYHuang/thcs" target="_new">操作說明與開放原始碼</a></div>
                <div>作者: Meng-Yuan Huang</div>
                <div><a href="mailto:myh@live.com" target="_new">myh@live.com</a></div>
              </div>
            </IonItem>
          </IonList>

          <IonToast
            cssClass='uiFont'
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({ showToast: false })}
            message={this.state.toastMessage}
            duration={2000}
          />
        </IonContent>
      </IonPage >
    );
  }
};

const mapStateToProps = (state: any /*, ownProps*/) => {
  return {
    settings: state.settings,
    hasAppLog: state.settings.hasAppLog,
    theme: state.settings.theme,
    uiFontSize: state.settings.uiFontSize,
    speechRate: state.settings.speechRate,
    voiceURI: state.settings.voiceURI,
    mainVersion: state.tmpSettings.mainVersion,
  }
};

const SettingsPage = withIonLifeCycle(_SettingsPage);

export default connect(
  mapStateToProps,
)(SettingsPage);