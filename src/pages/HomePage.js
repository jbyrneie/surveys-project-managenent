import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import MyTasks from '../components/MyTasks';
import AppBar from '../components/AppBar';

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
    this.props.store.qiStore.setSelectedPage('home')
  }

  render() {
    return (
      <div className='page'>
        <AppBar title='Surveys' newSurvey={true}/>
        <MyTasks />
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(HomePage))
