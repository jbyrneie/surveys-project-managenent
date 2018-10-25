import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import SurveyDetails from '../components/SurveyDetails'

class SurveySettingsPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Survey Settings'/>
        <SurveyDetails tab='settings'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveySettingsPage))
