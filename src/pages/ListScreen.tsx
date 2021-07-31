import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonButton, IonIcon, IonLabel, IonList, IonItem, IonToast } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';


import { Settings } from '../models/Settings';
import { TmpSettings } from '../models/TmpSettings';
import Globals from '../Globals';
import { arrowBack, bookmark, shareSocial } from 'ionicons/icons';
import { Hospital } from '../models/Hospital';

import './Pages.css';
import { Bookmark } from '../models/Bookmark';

interface Props {
  dispatch: Function;
  settings: Settings;
  tmpSettings: TmpSettings;
}

interface State {
  showToast: boolean;
  toastMessage: string;
}

interface PageProps extends Props, RouteComponentProps<{
  tab: string;
  countyName: string;
  hospitalName: string;
}> { }

class _ListScreen extends React.Component<PageProps, State> {
  timeoutID = null
  hospital: Hospital;

  constructor(props: any) {
    super(props);
    const params = this.props.match.params;
    this.hospital = Globals.counties.find((c) => c.name === params.countyName)!.hospitals.find((h) => h.name === params.hospitalName)!;
    this.state = {
      showToast: false,
      toastMessage: '',
    };
    this.updateClinics();
  }

  async updateClinics() {
    await Globals.fetchClinics(this.hospital, this.props.dispatch);
  }

  addBookmarkHandler() {
    this.props.dispatch({
      type: "ADD_BOOKMARK",
      bookmark: new Bookmark({
        title: this.hospital.name,
        url: window.location.pathname
      }),
    });
    this.setState({ showToast: true, toastMessage: '書籤新增成功！' });
  }

  async selectDetail(clinicNo: string) {
    await this.props.dispatch({
      type: "TMP_SET_KEY_VAL",
      key: "clinicNoSel",
      val: clinicNo
    })
    this.props.history.push(`${Globals.pwaUrl}/county/${this.props.match.params.countyName}/${this.props.match.params.hospitalName}/${clinicNo}`);
  }

  renderRows() {
    return <IonList>
      <IonItem className='textBoldFont'>
        <IonLabel>醫生</IonLabel>
        <IonLabel>看診號</IonLabel>
      </IonItem>
      {
        this.props.tmpSettings.clinics.map((c, i) =>
          <IonItem className='textFont' button={true} key={`item${i}`} onClick={(e) => {
            this.selectDetail(c.clinicNo);
          }}>
            <IonLabel>{c.doctor}</IonLabel>
            <IonLabel>{c.visitNo}</IonLabel>
          </IonItem>)
      }
    </IonList>;
  }

  render() {
    var content = this.renderRows();
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot='start' onClick={e => this.props.history.goBack()}>
              <IonIcon icon={arrowBack} slot='icon-only' />
            </IonButton>

            <IonTitle className='uiFont'>{this.hospital.name}</IonTitle>

            <IonButton fill="clear" slot='end' onClick={e => {
              this.addBookmarkHandler();
            }}>
              <IonIcon icon={bookmark} slot='icon-only' />
            </IonButton>

            <IonButton fill="clear" slot='end' onClick={e => {
              this.props.dispatch({
                type: "TMP_SET_KEY_VAL",
                key: 'shareTextModal',
                val: {
                  show: true,
                  text: decodeURIComponent(window.location.href),
                },
              });
            }}>
              <IonIcon icon={shareSocial} slot='icon-only' />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ textAlign: 'center' }}>
          <IonLabel>上次更新：{this.props.tmpSettings.dbUpdateDate}</IonLabel>

          {content}

          <div className='bottomButtonRow'>
            <IonButton className='uiFont' fill='outline' shape='round' size='large'
              onClick={(e) => window.open(this.hospital.clinicStatusUrl)}>
              原網頁
            </IonButton>
            <IonButton className='uiFont' fill='outline' shape='round' size='large'
              onClick={() => this.updateClinics()}>
              刷新
            </IonButton>
          </div>

          <IonToast
            cssClass='uiFont'
            isOpen={this.state.showToast}
            onDidDismiss={() => this.setState({ showToast: false })}
            message={this.state.toastMessage}
            duration={2000}
          />
        </IonContent>
      </IonPage>
    );
  }
};

const mapStateToProps = (state: any /*, ownProps*/) => {
  return {
    tmpSettings: state.tmpSettings,
    settings: state.settings
  }
};

//const mapDispatchToProps = {};

const ListScreen = withIonLifeCycle(_ListScreen);

export default connect(
  mapStateToProps,
)(ListScreen);
