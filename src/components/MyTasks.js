import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button';
import Page from '@atlaskit/page';
import PageTitle from '../components/PageTitle'
import PageHeader from '@atlaskit/page-header';
import Badge from '@atlaskit/badge';
import {daysLeft, daysDuration, surveyDetails, mapStatusToAction, getAppearanceFromStatus, mapStatusToString} from '../lib/utils'
import moment from 'moment'
import numeral from 'numeral'

// Custom Styles
import '../css/qi.css'

type MyTheme = {
  button?: ({ hover: boolean }) => {
    backgroundColor: string,
    textColor: string,
  },
  lozenge?: ({ hover: boolean }) => {
    backgroundColor: string,
    textColor: string,
  },
};

const customLozengeTheme = (theme: MyTheme) => ({
  ...theme,
  button: state => ({
    ...(theme.button ? theme.button(state) : null),
    backgroundColor: state.hover ? 'palevioletred' : 'rebeccapurple',
  }),
  lozenge: state => ({
    ...(theme.button ? theme.button(state) : null),
    backgroundColor: state.hover ? 'palevioletred' : 'rebeccapurple',
    padding: state.hover?20:20,
    lineHeight: state.hover ?'20px':20,
    margin: state.hover?20:20
  }),
});


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

    return(
      <div className='container'>
        <PageHeader>My Tasks 
        <Badge appearance="primary" style={{padding: '0.6em 3em', margin: '0.6em 1em'}}>{myTasks.length}</Badge>
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
                  <td>{task.project}</td>
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
