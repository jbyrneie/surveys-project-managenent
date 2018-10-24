import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import MyTasks from '../components/MyTasks';
import Reporting from '../components/Reporting';
import AppBar from '../components/AppBar';

class ReportingPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Reporting' reporting={true} newSurvey={true}/>
        <MyTasks/>
        <Reporting/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(ReportingPage))
