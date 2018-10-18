import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import Page from '@atlaskit/page';
import PageTitle from '../components/PageTitle'
import SurveyDetailsMenu from '../components/SurveyDetailsMenu'
import PageHeader from '@atlaskit/page-header';
import {
  DropdownMenuStateless,
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';
import {
  Checkbox,
  CheckboxIcon
} from '@atlaskit/checkbox';
import _ from 'lodash'
import moment from 'moment'

// Custom Styles
import '../css/qi.css'

class SurveyDetails extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      populationFilter: 'All Populations',
      statusFilter: 'All Statuses',
      survey: {},
      filteredSurvey: {},
      isChecked: false,
    };
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    const survey = this.props.store.qiStore.selectedSurvey
    this.setState({survey: JSON.parse(JSON.stringify(survey)), filteredSurvey: JSON.parse(JSON.stringify(survey))})
  }

  componentDidMount() {
    const survey = this.props.store.qiStore.selectedSurvey
    this.setState({survey: JSON.parse(JSON.stringify(survey)), filteredSurvey: JSON.parse(JSON.stringify(survey))})
  }

  _inviteCM(event) {
    console.log('_inviteCM called: ');
  }

  _filterCM(event) {
    console.log('_filterCM called: ');
  }

  _unattachCM(event) {
    console.log('_unattachCM called: ');
  }

  _blockCM(event) {
    console.log('_blockCM called: ');
  }

  _newList(event) {
    console.log('_newList called: ');
  }

  _filterPopulation(cms) {
    console.log('_filterPopulation: ', JSON.stringify(cms));
    const filtered = _.uniqBy(cms, 'title');
    let population = []
    _.forEach(filtered, function(cm) {
      population.push({value: cm.title, label: cm.title})
    });
    return population
  }

  _filterStatus(cms) {
    console.log('_filterStatus: ', JSON.stringify(cms));
    const filtered = _.uniqBy(cms, 'status');
    let statuses = []
    _.forEach(filtered, function(cm) {
      statuses.push({value: cm.status, label: cm.status})
    });
    return statuses
  }

  _filterCMByPopulation(survey, event) {
    let filtered

    let filterOptions = {}
    if (event.target.value!=='All Populations') {
      filterOptions.title = event.target.value
      filtered = survey
    } else {
      // _.cloneDeep() throws a kaniption if used with Mobx :-()
      filtered = JSON.parse(JSON.stringify(this.state.survey));
    }

    if (this.state.statusFilter!=='All Statuses')
      filterOptions.status = this.state.statusFilter

    const cms = _.filter(filtered.cms, filterOptions)
    filtered.cms = cms

    this.setState({filteredSurvey: filtered, populationFilter: event.target.value})
  }

  _filterCMByStatus(survey, event) {
    console.log('_filterCMByStatus: ', event.target.value);
    let filtered

    let filterOptions = {}
    if (event.target.value!=='All Statuses') {
      filterOptions.status = event.target.value
      filtered = survey
    } else {
      filtered = JSON.parse(JSON.stringify(this.state.survey));
    }

    if (this.state.populationFilter !== 'All Populations')
      filterOptions.title = this.state.populationFilter

    const cms = _.filter(filtered.cms, filterOptions)
    filtered.cms = cms
    this.setState({filteredSurvey: filtered, statusFilter: event.target.value})
  }

  _onCheckboxChange = (event: any) => {
    this.setState({
      isChecked: !this.state.isChecked,
      onChangeResult: `onChange Event with target.checked: ${
        event.target.checked
      }`,
    });
  };

  render() {
    const survey = this.state.filteredSurvey
    const population = this._filterPopulation(survey.cms)
    const statuses = this._filterStatus(survey.cms)
    const createdOn = `Created on ${moment(survey.createDate).format("MMMM Do YYYY")}`

    return(
      <div className='container'>
        <SurveyDetailsMenu tab='invites'/>
        <div style={{marginTop: '1em', marginBottom: '1em'}}>
          <div style={{float:'left'}}>
            <span style={{display: 'inline-block'}}>
              <DropdownMenuStateless
                isOpen={this.state.isPopulationDropdownOpen}
                onOpenChange={attrs => {
                  this.setState({ isPopulationDropdownOpen: attrs.isOpen });
                }}
                onSelect={this._filterCMByStatus.bind(this, survey)}
                trigger="All Populations"
                triggerType="button"
                isMenuFixed
              >
                <DropdownItemGroupRadio id="status">
                  {population.map((option, index) => (
                    <DropdownItemRadio
                      id={option.value}
                    >{option.value}</DropdownItemRadio>
                  ))}
                </DropdownItemGroupRadio>
              </DropdownMenuStateless>
            </span>
            <span style={{display: 'inline-block'}}>
              <ButtonGroup>
                <Button
                  appearance="default"
                  onClose={() => { }}
                >INVITE
                </Button>
                <Button
                  appearance="default"
                  onClose={() => { }}
                >UNATTACH
                </Button>
                <Button
                  appearance="default"
                  onClose={() => { }}
                >BLOCK
                </Button>
                <Button
                  appearance="default"
                  onClose={() => { }}
                >CREATE NEW LIST
                </Button>
              </ButtonGroup>
            </span>
          </div>
          <div style={{float:'right'}}>
            <span style={{fontWeight: '900', color:'black', marginRight:'1em'}}>{3} Invites</span>
            <span style={{display: 'inline-block'}}>
              <DropdownMenuStateless
                isOpen={this.state.isStatusDropdownOpen}
                onOpenChange={attrs => {
                  this.setState({ isStatusDropdownOpen: attrs.isOpen });
                }}
                onChange={this._filterCMByStatus.bind(this, survey)}
                trigger="All Statuses"
                triggerType="button"
                isMenuFixed
              >
                <DropdownItemGroupRadio id="status">
                  {statuses.map((option, index) => (
                    <DropdownItemRadio id={option.value}>{option.value}</DropdownItemRadio>
                  ))}
                </DropdownItemGroupRadio>
              </DropdownMenuStateless>
            </span>
          </div>
        </div>
        <div style={{marginTop: '7em'}}>
        <table>
          <thead>
            <tr className='table-row'>
              <th style={{display: 'inline-block'}}>
                <span>
                  <Checkbox
                    isChecked={this.state.isChecked}
                    onChange={this._onCheckboxChange}
                  />
                </span>
                <span>Checkbox</span>
              </th>
              <th>LOCATION</th>
              <th>POPULATION</th>
              <th>RATE</th>
              <th>STATUS</th>
              <th>INVITE DATE</th>
            </tr>
          </thead>
          <tbody>
            {survey.cms.map((cm, index) => (
              <tr className='table-row' key={index}>
                <td>
                  <div>
                    <span>
                      <Checkbox
                        isChecked={this.state.isChecked}
                        onChange={this._onCheckboxChange}
                      />
                    </span>
                    <span>picon</span>
                  </div>
                </td>
                <td>{cm.location}</td>
                <td>{cm.title}</td>
                <td>${cm.rate}</td>
                <td>{cm.status}</td>
                <td>{cm.statusDate}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SurveyDetails))
