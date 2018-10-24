import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import Lead from '../components/Lead';

class LeadsPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='New Lead'/>
        <Lead />
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(LeadsPage))
