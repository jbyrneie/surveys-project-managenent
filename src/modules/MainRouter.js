import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import HomePage from '../pages/HomePage';
import ProgrammingPage from '../pages/ProgrammingPage';
import ReportingPage from '../pages/ReportingPage'
import VendorsPage from '../pages/VendorsPage';
import VendorSurveysPage from '../pages/VendorSurveysPage';
import FeasabilityPage from '../pages/FeasabilityPage';
import SurveyActivityPage from '../pages/SurveyActivityPage';
import SurveyDetailsPage from '../pages/SurveyDetailsPage';
import SurveyInvitesPage from '../pages/SurveyInvitesPage';
import SurveyQuotePage from '../pages/SurveyQuotePage';
import SurveyPerformancePage from '../pages/SurveyPerformancePage';
import SurveySettingsPage from '../pages/SurveySettingsPage';
import LeadsPage from '../pages/LeadsPage';

export default class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      navOpenState: {
        isOpen: true,
        width: 304,
      }
    }
  }

  getChildContext () {
    return {
      navOpenState: this.state.navOpenState,
    };
  }

  appWithPersistentNav = () => (props) => (
    <App
      onNavResize={this.onNavResize}
      {...props}
    />
  )

  onNavResize = (navOpenState) => {
    this.setState({
      navOpenState,
    });
  }

  render() {
    console.log("MainRouter rendered MOUNT: ", process.env.REACT_APP_MOUNT);
    return (
      <Router history={browserHistory}>
        <Route component={this.appWithPersistentNav()}>
          <Route path={process.env.REACT_APP_MOUNT + '/'}  component={HomePage} />
          <Route path={process.env.REACT_APP_MOUNT + '/home'}  component={HomePage} />
          <Route path={process.env.REACT_APP_MOUNT + '/feasability'} component={FeasabilityPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/lead'} component={LeadsPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/programming'} component={ProgrammingPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveyQuote'} component={SurveyQuotePage} />
          <Route path={process.env.REACT_APP_MOUNT + '/reporting'} component={ReportingPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveyActivity'} component={SurveyActivityPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveyDetails'} component={SurveyDetailsPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveyInvites'} component={SurveyInvitesPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveyPerformance'} component={SurveyPerformancePage} />
          <Route path={process.env.REACT_APP_MOUNT + '/surveySettings'} component={SurveySettingsPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/vendors'} component={VendorsPage} />
          <Route path={process.env.REACT_APP_MOUNT + '/vendorSurveys'} component={VendorSurveysPage} />
        </Route>
      </Router>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
}
