import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button, { ButtonGroup } from '@atlaskit/button';
import Programming from '../components/Programming';
import MyTasks from '../components/MyTasks';
import AppBar from '../components/AppBar';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import _ from 'lodash';
import {STATUS} from '../lib/utils'

class HomePage extends Component {
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
  }

  render() {
    const tasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.PROGRAMMING])
    
    return (
      <div>
        <AppBar title='Programming' newSurvey={true}/>
        <MyTasks tasks={tasks}/>
        <Programming tasks={tasks}/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(HomePage))