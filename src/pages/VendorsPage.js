import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Vendors from '../components/Vendors';
import AppBar from '../components/AppBar';

class VendorsPage extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    this.props.store.qiStore.setSelectedPage('vendors')
  }

  render() {
    return (
      <div className='page'>
        <AppBar title='Vendors' newSurvey={true}/>
        <Vendors/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(VendorsPage))
