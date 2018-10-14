import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button, { ButtonGroup } from '@atlaskit/button';
import VendorSurveysByCategory from '../components/VendorSurveysByCategory';
import VendorSurveysBySurvey from '../components/VendorSurveysBySurvey';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import AppBar from '../components/AppBar';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import _ from 'lodash';
import {STATUS} from '../lib/utils'

class VendorsPage extends Component {
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

  _handleSortBy(event) {
    console.log('_handleSortBy: ', event.target.value);
    this.setState({sortBy: event.target.value})
  }

  _filterBy(event) {
    console.log('_filterBy: ', event.target.value);
    this.setState({filterBy: event.target.value})
  }

  _vendorSurveys(index, vendors, event) {
    console.log('_vendorSurveys: %s %s', index, JSON.stringify(vendors[index]));
    this.props.store.qiStore.setSelectedVendor(vendors[index])
    //const {router: {goTo}} = this.props.store
    //goTo(views.vendorSurveys, {}, this.props.store.selectedVendor)
  }
  
  render() {
    const vendors = this.props.store.qiStore.vendors
    console.log('vendors: ', JSON.stringify(vendors));
    return (
      <div>
        <AppBar title='Vendors' newSurvey={true}/>
        <table>
          <thead>
            <tr>
              <th >VENDOR</th>
              <th >COMPLETED</th>
              <th >EXCLUDED</th>
            </tr>
          </thead>
          <tbody>
          {vendors.map((vendor, index) => {
            const percentCompleted = Math.round((vendor.completed/(vendor.completed + vendor.excluded))*100)
            const percentCompletedSymbol = `${percentCompleted}%`
            const percentExcluded = Math.round((vendor.excluded/(vendor.completed + vendor.excluded))*100)
            const percentExcludedSymbol = `${percentExcluded}%`
            return (
              <tr key={index} onClick={this._vendorSurveys.bind(this, index, vendors)}>
                <td>{vendor.name}</td>
                <td><Progress
                        theme={{
                          success: {
                            color: 'rgb(223, 105, 180)',
                            symbol: percentCompletedSymbol
                          },
                        }}
                        percent={percentCompleted}
                        status="success"
                      />
                </td>
                <td style={{marginRight:10}}><Progress
                                              theme={{
                                                error: {
                                                  color: 'red',
                                                  symbol: percentExcludedSymbol
                                                },
                                              }}
                                              percent={percentExcluded}
                                              status="error"
                                            />
                </td>
              </tr>
            )}
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(VendorsPage))