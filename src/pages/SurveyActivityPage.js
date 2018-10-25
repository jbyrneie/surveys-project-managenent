import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import SurveyDetails from '../components/SurveyDetails'

class SurveyActivityPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Survey Activity'/>
        <SurveyDetails tab='activity'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveyActivityPage))
