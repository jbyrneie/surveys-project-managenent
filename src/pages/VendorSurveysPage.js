import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import AppBar from '../components/AppBar';
import VendorSurveysByCategory from '../components/VendorSurveysByCategory';
import VendorSurveysBySurvey from '../components/VendorSurveysBySurvey';

class VendorSurveysPage extends Component {
  render() {
    return (
      <div className='page'>
        <AppBar title='Vendor Surveys' newSurvey={true}/>
        <VendorSurveysByCategory />
        <VendorSurveysBySurvey />
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveysPage))
