import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Programming from '../components/Programming';
import MyTasks from '../components/MyTasks';
import AppBar from '../components/AppBar';
import _ from 'lodash';
import {STATUS} from '../lib/utils'

class ProgrammingPage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    this.props.store.qiStore.setSelectedPage('programming')
  }

  render() {
    const tasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.PROGRAMMING])

    return (
      <div className='page'>
        <AppBar title='Programming' programming={true} newSurvey={true}/>
        <MyTasks tasks={tasks}/>
        <Programming tasks={tasks}/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(ProgrammingPage))
