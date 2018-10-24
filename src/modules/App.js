import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter} from 'react-router-dom';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Modal from '@atlaskit/modal-dialog';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import SideBar from '../components/SideBar';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    console.log('App.js started.....');
    console.log('selectedPage: ', this.props.store.qiStore.selectedPage);
    return (
      <div>
        <Page
          navigation={<SideBar menu={this.props.menu}/>}
        >
          {this.props.children}
        </Page>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(App))
