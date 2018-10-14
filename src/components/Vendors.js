import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button, { ButtonGroup } from '@atlaskit/button';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import AppBar from '../components/AppBar';
import VendorSurveysByCategory from './VendorSurveysByCategory';
import VendorSurveysBySurvey from './VendorSurveysBySurvey';
import ContentWrapper from './ContentWrapper';
import PageTitle from './PageTitle';
import _ from 'lodash';
import {STATUS} from '../lib/utils'

class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = { groupBy: '0', filterBy: '0' }
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    this.props.store.qiStore.getVendors()
    .then(() => {
    })
  }

  _vendorSurveys(index, vendors, event) {
    console.log('_vendorSurveys: %s %s', index, JSON.stringify(vendors[index]));
    this.props.store.qiStore.setSelectedVendor(vendors[index])
    //const {router: {goTo}} = this.props.store
    //goTo(views.vendorSurveys, {}, this.props.store.selectedVendor)
  }
  
  render() {
    const vendors = this.props.store.qiStore.vendors
    return (
      <div style={{padding:30, backgroundColor: 'white'}}>
        <table>
          <thead>
            <tr style={{borderBottom: '1px solid #ddd', height:'4em'}}>
              <th>VENDOR</th>
              <th>COMPLETED</th>
              <th>EXCLUDED</th>
            </tr>
          </thead>
          <tbody>
          {vendors.map((vendor, index) => {
            const percentCompleted = Math.round((vendor.completed/(vendor.completed + vendor.excluded))*100)
            const percentCompletedSymbol = `${percentCompleted}%`
            const percentExcluded = Math.round((vendor.excluded/(vendor.completed + vendor.excluded))*100)
            const percentExcludedSymbol = `${percentExcluded}%`
            return (
              <tr key={index} onClick={this._vendorSurveys.bind(this, index, vendors)} style={{borderBottom: '1px solid #ddd', height:'4em'}}>
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
                <td><Progress
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
export default inject((allStores) => ({ ...allStores }))(observer(Vendors))