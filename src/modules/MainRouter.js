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
import SurveyDetailsPage from '../pages/SurveyDetailsPage';
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
    return (
      <Router history={browserHistory}>
        <Route component={this.appWithPersistentNav()}>
          <Route path="/" component={HomePage} />
          <Route path="/feasability" component={FeasabilityPage} />
          <Route path="/lead" component={LeadsPage} />
          <Route path="/programming" component={ProgrammingPage} />
          <Route path="/reporting" component={ReportingPage} />
          <Route path="/surveyDetails" component={SurveyDetailsPage} />
          <Route path="/vendors" component={VendorsPage} />
          <Route path="/vendorSurveys" component={VendorSurveysPage} />
        </Route>
      </Router>
    );
  }
}

MainRouter.childContextTypes = {
  navOpenState: PropTypes.object,
}
