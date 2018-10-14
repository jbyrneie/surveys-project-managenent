import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Vendors from '../components/Vendors';
import AppBar from '../components/AppBar';

class LeadsPage extends Component {  
  render() {
    return (
      <div>
        <AppBar title='New Lead'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(LeadsPage))