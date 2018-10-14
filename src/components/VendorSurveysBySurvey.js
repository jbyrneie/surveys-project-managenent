import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Page from '@atlaskit/page';
import PageTitle from '../components/PageTitle'
import PageHeader from '@atlaskit/page-header';
import Badge from '@atlaskit/badge';
import {daysLeft, daysDuration, surveyDetails, taskTitle, asigneesAbbreviation} from '../lib/utils'

class VendorSurveysBySurvey extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const vendorSurveys = this.props.store.qiStore.selectedVendorSurveys

    return(
      <div className='container'>
        <PageHeader>Performance by Survey
        <Badge appearance="primary">{vendorSurveys.length}</Badge>
        </PageHeader>
        <table>
          <thead>
            <tr>
              <th >PROJECT</th>
              <th >STARTS</th>
              <th >%</th>
              <th >OVER QUOTA</th>
              <th >%</th>
              <th >INCIDENCE</th>
              <th >%</th>
              <th >DROPOUT</th>
              <th >%</th>
              <th >COMPLETED</th>
              <th >%</th>
            </tr>        
          </thead>
          <tbody>
          {vendorSurveys.map((survey, index) => {
              const total = survey.status.stats.start + survey.status.stats.oq + survey.status.stats.ir + survey.status.stats.dropout + survey.status.stats.complete
              const percentStarts = Math.round((survey.status.stats.start/total)*100)
              const percentOverQuota = Math.round((survey.status.stats.oq/total)*100)
              const percentIncidence = Math.round((survey.status.stats.ir/total)*100)
              const percentDropOuts = Math.round((survey.status.stats.dropout/total)*100)
              const percentCompleted = Math.round((survey.status.stats.complete/total)*100)

              return (
                <tr key={index}>
                  <td>{survey.project}</td>
                  <td>{survey.status.stats.start}</td>
                  <td>{percentStarts}%</td>
                  <td>{survey.status.stats.oq}</td>
                  <td>{percentOverQuota}%</td>
                  <td>{survey.status.stats.ir}</td>
                  <td>{percentIncidence}%</td>
                  <td>{survey.status.stats.dropout}</td>
                  <td>{percentDropOuts}%</td>
                  <td>{survey.status.stats.complete}</td>
                  <td>{percentCompleted}%</td>
                </tr>
              )})}
          </tbody>
        </table>
      </div>  
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveysBySurvey))
