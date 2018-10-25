import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import SideBar from '../components/SideBar';

class App extends Component {
  render() {
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
