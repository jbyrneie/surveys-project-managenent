import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import SurveyDetails from '../components/SurveyDetails'

class SurveyInvitesPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Survey Invites'/>
        <SurveyDetails tab='invites'/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(SurveyInvitesPage))
