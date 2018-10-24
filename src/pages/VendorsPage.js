import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Vendors from '../components/Vendors';
import AppBar from '../components/AppBar';

class VendorsPage extends Component {
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
