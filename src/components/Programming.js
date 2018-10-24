import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
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

class Programming extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const tasks = this.props.tasks

    return(
      <div className='container'>
        <PageHeader>Programming
          <span className='bubble'>{tasks.length}</span>
        </PageHeader>
        <table>
          <thead>
            {this.props.summary?
              <tr className='table-row'>
                <th >PROJECT</th>
                <th >TEAM</th>
                <th >TIME LEFT</th>
                <th >DAYS</th>
                <th >REVENUE</th>
              </tr>
              :
              <tr className='table-row'>
                <th >PROJECT</th>
                <th >REVENUE</th>
                <th >TIME LEFT</th>
                <th >DAYS</th>
                <th >PROGRAMMER</th>
              </tr>
            }
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              this.props.summary?
                <tr className='table-row' key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                  <td>{task.project}</td>
                  <td>{asigneesAbbreviation(task.asignees)}</td>
                  <td>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</td>
                  <td>{daysDuration(task.createDate)}</td>
                  <td>${numeral(task.revenue).format('0,0')}</td>
                </tr>
              :
                <tr className='table-row' key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                  <td>{task.project}</td>
                  <td>${numeral(task.revenue).format('0,0')}</td>
                  <td>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</td>
                  <td>{daysDuration(task.createDate)}</td>
                  <td>Assign</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Programming))
