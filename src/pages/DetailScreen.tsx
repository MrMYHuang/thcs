import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonButton, IonLabel, IonList, IonItem, IonIcon, IonToast } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import { Settings } from '../models/Settings';
import { TmpSettings } from '../models/TmpSettings';
import Globals from '../Globals';
import { Hospital } from '../models/Hospital';

import './Pages.css';
import { arrowBack, bookmark, shareSocial } from 'ionicons/icons';
import { Bookmark } from '../models/Bookmark';
import { Clinic } from '../models/Clinic';

var dispFields = ["醫生", "診間", "診號", "科別"]

var keys = ["doctor", "clinicNo", "visitNo", "division"]

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
  clinicNo: string;
}> { }

class _DetailScreen extends React.Component<PageProps, State> {
  hospital: Hospital;
  clinicNoSel: string;
  clinic: Clinic | undefined;

  constructor(props: PageProps) {
    super(props);
    this.state = {
      showToast: false,
      toastMessage: '',
    };

    const params = this.props.match.params;
    this.hospital = Globals.counties.find((c) => c.name === params.countyName)!.hospitals.find((h) => h.name === params.hospitalName)!;
    this.clinicNoSel = this.props.match.params.clinicNo;

    if (this.props.tmpSettings.clinics.length === 0) {
      this.updateClinics();
    } else {
      this.setSelectedClinic();
    }
  }

  setSelectedClinic() {
    this.clinic = this.props.tmpSettings.clinics.find(c => c.clinicNo === this.clinicNoSel);
  }

  async updateClinics() {
    await Globals.fetchClinics(this.hospital, this.props.dispatch);
    this.setSelectedClinic();
  }

  addBookmarkHandler() {
    this.props.dispatch({
      type: "ADD_BOOKMARK",
      bookmark: new Bookmark({
        title: `${this.hospital.name} ${this.clinic!.doctor}`,
        url: window.location.pathname
      }),
    });
    this.setState({ showToast: true, toastMessage: '書籤新增成功！' });
  }

  render() {
    var rows = [];
    for (var i = 0; i < keys.length; i++) {
      rows.push(<IonItem key={i} className='textFont'>
        {dispFields[i] + "：" + (this.clinic as any)[keys[i]]}
      </IonItem>)
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton fill="clear" slot='start' onClick={e => this.props.history.goBack()}>
              <IonIcon icon={arrowBack} slot='icon-only' />
            </IonButton>

            <IonTitle className='uiFont'>詳細資訊</IonTitle>

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
          <IonLabel className='uiFont'>上次更新：{this.props.tmpSettings.dbUpdateDate}</IonLabel>
          <IonList>
            {rows}
          </IonList>

          <div className='bottomButtonRow'>
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
}

const mapStateToProps = (state: any /*, ownProps*/) => {
  return {
    tmpSettings: state.tmpSettings,
    settings: state.settings
  }
};

//const mapDispatchToProps = {};

const DetailScreen = withIonLifeCycle(_DetailScreen);

export default connect(
  mapStateToProps,
)(DetailScreen);
