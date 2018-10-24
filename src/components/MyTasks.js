import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button';
import Page from '@atlaskit/page';
import PageTitle from '../components/PageTitle'
import PageHeader from '@atlaskit/page-header';
import Badge from '@atlaskit/badge';
import { ThemeProvider } from 'styled-components';
import { themed, colors } from '@atlaskit/theme';
import {daysLeft, daysDuration, surveyDetails, mapStatusToAction, getAppearanceFromStatus, mapStatusToString} from '../lib/utils'
import moment from 'moment'
import numeral from 'numeral'

// Custom Styles
import '../css/qi.css'

class MyTasks extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const myTasks = this.props.store.qiStore.myTasks
    const theme = {
      primary: {
        background: {
          default: themed({ light: '#8a96a0'}),
        },
      },
    };

    return(
      <div className='container'>
        <PageHeader>My Tasks
          <span className='bubble'>{myTasks.length}</span>
        </PageHeader>
        <table>
          <thead>
            <tr className='table-row'>
              <th>PROJECT</th>
              <th></th>
              <th>REVENUE</th>
              <th>TIME LEFT</th>
              <th>DAYS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
          {myTasks.map((task, index) => {
            const stuff = mapStatusToString(task.status.statusId)
            console.log(JSON.stringify(stuff));
            return (
                <tr className='table-row' key={index} onClick={surveyDetails.bind(this, index, myTasks)}>
                  {task.rush?
                    <td>
                      <span className='label' style={{backgroundColor: '#ed6a80'}}>RUSH</span>&nbsp;{task.project}
                    </td>
                    :
                    <td>{task.project}</td>
                  }
                  <td>
                    <span className='label' style={{backgroundColor: stuff.color}}>{stuff.label}</span>
                  </td>
                  <td>${numeral(task.revenue).format('0,0')}</td>
                  <td>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</td>
                  <td>{daysDuration(task.createDate)}</td>
                  <td>{mapStatusToAction(task.status.statusId)}</td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(MyTasks))
