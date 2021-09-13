import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonReorderGroup, IonReorder, IonItem, IonLabel, withIonLifeCycle, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonButton, IonToast } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Bookmark } from '../models/Bookmark';
import { swapVertical } from 'ionicons/icons';
import Globals from '../Globals';
import { Settings } from '../models/Settings';
import { TmpSettings } from '../models/TmpSettings';

interface Props {
  dispatch: Function;
  bookmarks: [Bookmark];
  tmpSettings: TmpSettings;
  settings: Settings;
  fontSize: number;
}

interface State {
  reorder: boolean;
  showToast: boolean;
  toastMessage: string;
}

interface PageProps extends Props, RouteComponentProps<{
  tab: string;
  path: string;
}> { }

const helpDoc = <>
  <div style={{ fontSize: 'var(--ui-font-size)', textAlign: 'center' }}><a href="https://github.com/MrMYHuang/twdi#web-app" target="_new">程式安裝說明</a></div>
  <div style={{ fontSize: 'var(--ui-font-size)', textAlign: 'center' }}><a href="https://github.com/MrMYHuang/twdi#shortcuts" target="_new">程式捷徑</a></div>
</>;

class _BookmarkPage extends React.Component<PageProps, State> {
  bookmarkListRef: React.RefObject<HTMLIonListElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      reorder: false,
      showToast: false,
      toastMessage: '',
    }
    this.bookmarkListRef = React.createRef<HTMLIonListElement>();
  }

  ionViewWillEnter() {
    if (!this.hasBookmark) {
      this.setState({ showToast: true, toastMessage: '無書籤！請將診間加至書籤。' });
      this.props.history.push(`${Globals.pwaUrl}/county`);
    }
    //console.log( 'view will enter' );
  }

  get hasBookmark() {
    return this.props.bookmarks.length > 0;
  }

  delBookmarkHandler(uuidStr: string) {
    this.props.dispatch({
      type: "DEL_BOOKMARK",
      title: uuidStr,
    });

    if (!this.hasBookmark) {
      this.setState({ showToast: true, toastMessage: '無書籤！請搜尋藥品並加至書籤。' });
      this.props.history.push(`${Globals.pwaUrl}/county`);
    }
  }

  reorderBookmarks(event: CustomEvent<ItemReorderEventDetail>) {
    const bookmarks = event.detail.complete(this.props.bookmarks);
    this.props.dispatch({
      type: "UPDATE_BOOKMARKS",
      bookmarks: bookmarks,
    });
  }

  getBookmarkRows() {
    let bookmarks = this.props.bookmarks;
    let rows = Array<object>();
    bookmarks.forEach((bookmark, i) => {
      let label = `${bookmark.title}`;
      rows.push(
        <IonItemSliding key={`bookmarkItemSliding_` + i}>
          <IonItem key={`bookmarkItem_` + i} button={true}
          onClick={e =>
            this.props.history.push(bookmark.url)
          }>
            <div tabIndex={0}></div>{/* Workaround for macOS Safari 14 bug. */}
            <IonLabel className='ion-text-wrap uiFont' key={`bookmarkItemLabel_` + i}>
              {label}
            </IonLabel>
            <IonReorder slot='end' />
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption style={{ fontSize: 'var(--ui-font-size)' }} color='danger' onClick={(e) => {
              this.delBookmarkHandler(bookmark.title);
              this.bookmarkListRef.current?.closeSlidingItems();
            }}>刪除</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    });
    return rows;
  }

  render() {
    const rows = this.getBookmarkRows();

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className='uiFont'>書籤</IonTitle>

            <IonButton fill={this.state.reorder ? 'solid' : 'clear'} slot='end'
              onClick={ev => this.setState({ reorder: !this.state.reorder })}>
              <IonIcon icon={swapVertical} slot='icon-only' />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {
            this.hasBookmark ?
              <>
                <IonList key='bookmarkList0' ref={this.bookmarkListRef}>
                  <IonReorderGroup disabled={!this.state.reorder} onIonItemReorder={(event: CustomEvent<ItemReorderEventDetail>) => { this.reorderBookmarks(event); }}>
                    {rows}
                  </IonReorderGroup>
                </IonList>
                {helpDoc}
              </>
              :
              <>
              </>
          }

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
    bookmarks: state.settings.bookmarks,
    settings: state.settings,
    tmpSettings: state.tmpSettings,
  }
};

//const mapDispatchToProps = {};

const BookmarkPage = withIonLifeCycle(_BookmarkPage);

export default connect(
  mapStateToProps,
)(BookmarkPage);