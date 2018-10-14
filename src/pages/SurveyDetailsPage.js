import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Vendors from '../components/Vendors';
import AppBar from '../components/AppBar';

class SurveyDetailsPage extends Component {  
  render() {
    return (
      <div>
        <AppBar title='Survey Details'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveyDetailsPage))