import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {navigate} from '../lib/utils';

// Custom Styles
import '../css/qi.css'

class Vendors extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
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
    const nav = navigate.bind(this, 'vendorSurveys')
    nav()
  }

  render() {
    const vendors = this.props.store.qiStore.vendors
    return (
      <div className='container'>
        <table>
          <thead>
            <tr className='table-row'>
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
              <tr className='table-row' key={index} onClick={this._vendorSurveys.bind(this, index, vendors)}>
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
