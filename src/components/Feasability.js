import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PageHeader from '@atlaskit/page-header';
import {surveyDetails, mapStatusToString} from '../lib/utils'

// Custom Styles
import '../css/qi.css'

class Feasability extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

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
          <span className='bubble'>{tasks.length}</span>
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
