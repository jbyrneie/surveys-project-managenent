import React from 'react'
import { Route } from 'mobx-router'
import SurveyLead from './pages/HomePage'
import SurveyDetails from './pages/SettingsPage'
import Quote from './pages/HomePage'
import Settings from './pages/HomePage'
import Feasability from './pages/HomePage'
import Programming from './pages/HomePage'
import Reporting from './pages/HomePage'
import Fielding from './pages/HomePage'
import Vendors from './pages/HomePage'
import VendorSurveys from './pages/HomePage'
import Home from './pages/HomePage'

let prefix=''
if (process.env.NODE_ENV === 'production')
  prefix = process.env.REACT_APP_QI_MOUNT

const gotoRouteIfLoggedIn = (store, views, runIfLoggedIn) => {
  runIfLoggedIn();
}

console.log('views..... prefix: ', prefix);
const views = {
  home: new Route({
    path: `${prefix}/`,
    component: <Home/>
  }),
  feasability: new Route({
    path: `${prefix}/feasability`,
    component: <Feasability/>
  }),
  fielding: new Route({
    path: `${prefix}/fielding`,
    component: <Fielding/>
  }),
  programming: new Route({
    path: `${prefix}/programming`,
    component: <Programming/>
  }),
  quote: new Route({
    path: `${prefix}/quote`,
    component: <Quote/>
  }),
  reporting: new Route({
    path: `${prefix}/reporting`,
    component: <Reporting/>
  }),
  settings: new Route({
    path: `${prefix}/settings`,
    component: <Settings/>
  }),
  surveyDetails: new Route({
    path: `${prefix}/surveyDetails`,
    component: <SurveyDetails/>
  }),
  surveyLead: new Route({
    path: `${prefix}/surveyLead`,
    component: <SurveyLead/>
  }),
  vendors: new Route({
    path: `${prefix}/vendors`,
    component: <Vendors/>
  }),
  vendorSurveys: new Route({
    path: `${prefix}/vendorSurveys`,
    component: <VendorSurveys/>
  }),
  catchall:new Route({
    path:`${prefix}/:def`,
    component: <Home/>
  })
};

export default views;
