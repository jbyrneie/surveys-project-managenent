import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import MyTasks from '../components/MyTasks';
import Feasability from '../components/Feasability';
import AppBar from '../components/AppBar';
import _ from 'lodash'
import {STATUS} from '../lib/utils'

class FeasabilityPage extends Component {
  componentWillMount() {
    this.props.store.qiStore.setSelectedPage('feasability')
  }

  render() {
    const tasks = _.filter(this.props.store.qiStore.myTasks, ['status.statusId', STATUS.FEASABILITY])
    return (
      <div className='page'>
        <AppBar title='Feasability' newSurvey={true}/>
        <MyTasks/>
        <Feasability tasks={tasks}/>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(FeasabilityPage))
