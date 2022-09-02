import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonButton, IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Settings } from '../models/Settings';
import { TmpSettings } from '../models/TmpSettings';

import { shareSocial } from 'ionicons/icons';
import Globals from '../Globals';
import './CountyScreen.css';

interface Props {
    dispatch: Function;
    settings: Settings;
    tmpSettings: TmpSettings;
}

interface State {
}

interface PageProps extends Props, RouteComponentProps<{
    tab: string;
    path: string;
}> { }

class _CountyScreen extends React.Component<PageProps, State> {

    openClinicStatusPage() {
        var { countyIdSel, hospitalIdSel } = this.props.settings
        let county = Globals.counties[countyIdSel];
        var hospital = county.hospitals[hospitalIdSel]
        switch (hospital.csTableType) {
            case 0:
            case 2:
            case 3:
                this.props.history.push(`${Globals.pwaUrl}/county/${county.name}/${hospital.name}`); break
            case 1: window.open(hospital.clinicStatusUrl); break
        }
    }

    async changeIdSel(idSel: string, val: number) {
        await this.props.dispatch({
            type: "SET_KEY_VAL",
            key: idSel,
            val: val
        })
    }

    render() {
        var { countyIdSel } = this.props.settings

        var countyItems = [];
        for (let i = 0; i < Globals.counties.length; i++) {
            countyItems.push(<IonSelectOption className='uiFont' key={`county${i}`} value={i}>{Globals.counties[i].name}</IonSelectOption>);
        }

        var hospitalItems = []
        var selHospitals = Globals.counties[countyIdSel].hospitals
        for (let i = 0; i < selHospitals.length; i++) {
            hospitalItems.push(<IonSelectOption className='uiFont' key={`hospital${i}`} value={i}>{selHospitals[i].name}</IonSelectOption>);
        }

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle style={{ fontSize: 'var(--ui-font-size)' }}>地區</IonTitle>

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
                    <IonLabel className='uiFont'>請選擇縣市、醫院，然後按 Go</IonLabel>

                    <div className='CountyScreenBlock'>
                        <IonLabel className='uiFont'>縣市</IonLabel>
                        <div className='CountyScreenSelectWrapper'>
                            <IonSelect
                                className='uiFont CountyScreenSelect'
                                interface='popover'
                                interfaceOptions={{ cssClass: 'thcsthemes' }}
                                onIonChange={async e => {
                                    const value = +e.detail.value;
                                    await this.changeIdSel('countyIdSel', value)
                                    await this.changeIdSel('hospitalIdSel', 0)
                                }}>
                                {countyItems}
                            </IonSelect>
                        </div>
                    </div>

                    <div className='CountyScreenBlock'>
                        <IonLabel className='uiFont'>醫院</IonLabel>
                        <div className='CountyScreenSelectWrapper'>
                            <IonSelect
                                className='uiFont CountyScreenSelect'
                                interface='popover'
                                interfaceOptions={{ cssClass: 'thcsthemes' }}
                                onIonChange={async e => {
                                    const value = +e.detail.value;
                                    await this.changeIdSel('hospitalIdSel', value)
                                }}
                            >
                                {hospitalItems}
                            </IonSelect>
                        </div>
                    </div>

                    <IonButton className='uiFont' fill='outline' shape='round' size='large' onClick={(e) => {
                        this.openClinicStatusPage();
                    }}>Go</IonButton>
                </IonContent>
            </IonPage>);
    }
};

const mapStateToProps = (state: any /*, ownProps*/) => {
    return {
        tmpSettings: state.tmpSettings,
        settings: state.settings
    }
};

//const mapDispatchToProps = {};

const CountyScreen = withIonLifeCycle(_CountyScreen);

export default connect(
    mapStateToProps,
)(CountyScreen);

