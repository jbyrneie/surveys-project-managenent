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
import {daysLeft, daysDuration, surveyDetails, mapStatusToAction, getAppearanceFromStatus, mapStatusToString} from '../lib/utils'
import moment from 'moment'
import numeral from 'numeral'

// Custom Styles
import '../css/qi.css'

class Feasability extends Component {
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
    const tasks = this.props.tasks

    return(
      <div className='container'>
        <PageHeader>Feasability
        <Badge appearance="primary" style={{padding: '0.6em 3em', margin: '0.6em 1em'}}>{tasks.length}</Badge>
        </PageHeader>
        <table>
          <thead>
            <tr className='table-row'>
              <td>PROJECT</td>
              <td>TIME LEFT</td>
              <td>DAYS</td>
              <td>TEAM</td>
            </tr>
          </thead>
          <tbody>
          {tasks.map((task, index) => {
            const stuff = mapStatusToString(task.status.statusId)
            console.log(JSON.stringify(stuff));
            return (
                <tr className='table-row' key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                  <td>{task.project}</td>
                  <td>5 days</td>
                  <td>2</td>
                  <td>Assign</td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>  
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Feasability))
