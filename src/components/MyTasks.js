import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Page from '@atlaskit/page';
import PageTitle from '../components/PageTitle'
import PageHeader from '@atlaskit/page-header';
import Badge from '@atlaskit/badge';
import {daysLeft, daysDuration, surveyDetails, mapStatusToAction, getAppearanceFromStatus, STATUS_TO_STRING} from '../lib/utils'
import moment from 'moment'
import numeral from 'numeral'

class MyTasks extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const myTasks = this.props.store.qiStore.myTasks

    return(
      <div style={{padding:30, backgroundColor: 'white'}}>
        <PageHeader>My Tasks 
        <Badge appearance="primary" style={{padding: '0.6em 3em', margin: '0.6em 1em'}}>{myTasks.length}</Badge>
        </PageHeader>
        <table>
          <thead style={{borderBottom: '1px solid #ddd', height:'3em'}}>
            <tr style={{height: '3em'}}>
              <th>PROJECT</th>
              <th></th>
              <th>REVENUE</th>
              <th>TIME LEFT</th>
              <th>DAYS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task, index) => (
              <tr key={index} onClick={surveyDetails.bind(this, index, myTasks)} style={{borderBottom: '1px solid #ddd', height:'3em'}}>
                <td>{task.project}</td>
                <td style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>
                  <Lozenge appearance={getAppearanceFromStatus(task.status.statusId)} isBold style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>
                    {STATUS_TO_STRING[task.status.statusId]}
                  </Lozenge>
                </td>
                <td style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>${numeral(task.revenue).format('0,0')}</td>
                <td style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</td>
                <td style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>{daysDuration(task.createDate)}</td>
                <td style={{paddingTop: '20px !important', paddingBottom:'20px !important'}}>{mapStatusToAction(task.status.statusId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(MyTasks))
