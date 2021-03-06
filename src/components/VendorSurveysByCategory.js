import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PageHeader from '@atlaskit/page-header'
import _ from 'lodash'

class VendorSurveysByCategory extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _getCategories(surveys) {
    const grouped = _.uniqBy(surveys, 'category');
    //console.log('grojuped: ', JSON.stringify(grouped));
    let categories = []
    _.forEach(grouped, function(survey) {
      //console.log('category: ', JSON.stringify(survey));
      categories.push(survey.category)
    });
    return categories
  }

  _getStatsByCatgory(category, surveys) {
    let total = 0
    let startTotal = 0
    let oqTotal = 0
    let irTotal = 0
    let dropOutTotal = 0
    let completeTotal = 0

    _.forEach(surveys, function(survey) {
      if (survey.category === category) {
        total += survey.status.stats.start + survey.status.stats.oq + survey.status.stats.ir + survey.status.stats.dropout + survey.status.stats.complete;
        startTotal += survey.status.stats.start
        oqTotal += survey.status.stats.oq
        irTotal += survey.status.stats.ir
        dropOutTotal += survey.status.stats.dropout
        completeTotal += survey.status.stats.complete
      }
    });

    const stats = {total: total,
                   start: startTotal,
                   percentStart: Math.round((startTotal/total)*100),
                   oq: oqTotal,
                   percentOverQuota: Math.round((oqTotal/total)*100),
                   ir: irTotal,
                   percentIncidence: Math.round((irTotal/total)*100),
                   dropOut: dropOutTotal,
                   percentDropOut: Math.round((dropOutTotal/total)*100),
                   complete: completeTotal,
                   percentComplete: Math.round((completeTotal/total)*100)
                 }
   return stats
  }

  render() {
    const vendorSurveys = this.props.store.qiStore.selectedVendorSurveys
    const categories = this._getCategories(vendorSurveys)

    return(
      <div className='container'>
        <PageHeader>Performance by Category
          <span className='bubble'>{vendorSurveys.length}</span>
        </PageHeader>
        <table>
          <thead>
            <tr className='table-row'>
              <th >CATEGORY</th>
              <th >STARTS</th>
              <th >%</th>
              <th >OVER QUOTA</th>
              <th >%</th>
              <th >INCIDENCE</th>
              <th >%</th>
              <th >DROPOUT</th>
              <th >%</th>
              <th >COMPLETED</th>
              <th >%</th>
            </tr>
          </thead>
          <tbody>
          {categories.map((category, index) => {
              const stats = this._getStatsByCatgory(category, vendorSurveys)
              return (
                <tr className='table-row' key={index}>
                  <td>{category}</td>
                  <td>{stats.start}</td>
                  <td>{stats.percentStart}%</td>
                  <td>{stats.oq}</td>
                  <td>{stats.percentOverQuota}%</td>
                  <td>{stats.ir}</td>
                  <td>{stats.percentIncidence}%</td>
                  <td>{stats.dropOut}</td>
                  <td>{stats.percentDropOut}%</td>
                  <td>{stats.complete}</td>
                  <td>{stats.percentComplete}%</td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveysByCategory))
