import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import Quote from '../components/Quote'

class SurveyQuotePage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Survey Quote'/>
        <Quote />
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveyQuotePage))
