import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import SurveyDetails from '../components/SurveyDetails'

class SurveyPerformancePage extends Component {
  render() {
    return (
      <div>
        <AppBar title='Survey Performance'/>
        <SurveyDetails tab='performance'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveyPerformancePage))
