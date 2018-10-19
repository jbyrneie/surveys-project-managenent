import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import TextField from '@atlaskit/field-text'
import TextArea from '@atlaskit/field-text-area'
import Button from '@atlaskit/button';
import SingleSelect from '@atlaskit/single-select';
import AsyncSelect from 'react-select/lib/Async'
import { Field } from '@atlaskit/form';
import Select from '@atlaskit/select';
import { getClientSuggestions, getContactSuggestions, getRMSuggestions} from '../lib/suggestions'

const clientNameOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getClientSuggestions(inputValue));
    }, 1000);
  });

const clientContactOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getContactSuggestions(inputValue));
    }, 1000);
  });

const researchManagerOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getRMSuggestions(inputValue));
    }, 1000);
  });

const surveyManagerOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(getRMSuggestions(inputValue));
    }, 1000);
  });

const priorities = [
  {
    items: [
      { content: 'Low', value: 'Low' },
      { content: 'Medium', value: 'Medium' },
      { content: 'High', value: 'High' },
    ],
  },
];

class Lead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_name: '',
      client_contact: '',
      research_manager: '',
      survey_manager: '',
      title: '',
      description: '',
      suggestions: [],
      priority: 'Medium',
      valid: false,
      leadSaved: false,
      snackBarOpen: true,
      clientNameInvalid: false,
      clientContactInvalid: false,
      researchManagerInvalid: false,
      surveyManagerInvalid: false,
      titleInvalid: false,
      descriptionInvalid: false,
      saveInvoked: false
    };
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    this.setState({
      clientNameInvalid:false,
      clientContactInvalid:false,
      researchManagerInvalid:false,
      surveyManagerInvalid:false,
      titleInvalid:false,
      descriptionInvalid:false,
      saveInvoked: false,
    })
  }

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  _getClientSuggestions(value) {
    return getClientSuggestions(value)
  }

  _getContactSuggestions(value) {
    console.log('_getContactSuggestions: ', value);
    return getContactSuggestions(value)
  }

  _getResearchManagerSuggestions(value) {
    return getRMSuggestions(value)
  }

  _getSurveyManagerSuggestions(value) {
    return getRMSuggestions(value)
  }

  _handleChange(field, event) {
    console.log('_handleChange: ', field, event.target.name, event.target.value);
    this.setState(
      { [field]: event.target.value},
      () => {
        this.setState({valid: this._validate()})
        console.log('desc: %s title: %s', this.state.title, this.state.description);
      }
    );
  };

  _handleClientNameChange(clientName) {
    console.log('handleClientNameChange: ', clientName);
    this.setState(
      { client_name: clientName.value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleClientContactChange(contactName) {
    console.log('handleContactNameChange: ', contactName);
    this.setState(
      { client_contact: contactName.value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleResearchManagerChange(researchManager) {
    console.log('_handleResearchManagerChange: ', researchManager);
    this.setState(
      { research_manager: researchManager.value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleSurveyManagerChange(surveyManager) {
    console.log('_handleSurveyManagerChange: ', surveyManager);
    this.setState(
      { survey_manager: surveyManager.value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handlePriorityChange = name => event => {
    console.log('_handlePriorityChange: ', name);
    this.setState({
      [name]: event.target.value,
      valid: this._validate()
    });
  };

  _validate() {
    console.log('_validate client: %s contact: %s rezearchManager: %s surveyManager: %s',this.state.client_name, this.state.client_contact, this.state.research_manager, this.state.survey_manager);

    if (this.state.saveInvoked)
    this.setState({
      clientNameInvalid:this.state.client_name?false:true,
      clientContactInvalid:this.state.client_contact?false:true,
      researchManagerInvalid:this.state.research_manager?false:true,
      surveyManagerInvalid:this.state.survey_manager?false:true,
      titleInvalid:this.state.title?false:true,
      descriptionInvalid:this.state.description?false:true,
      saveInvoked: true,
      valid: this.state.client_name && this.state.client_contact && this.state.research_manager && this.state.survey_manager && this.state.title && this.state.description?true:false
    })
  }

  _save(event) {
    console.log('save called: ', this.state.title);

    // TODO: Need a callback here
    this.setState({ saveInvoked: true},
      () => {
        this._validate()
        if (this.state.valid) {
          console.log('I can save....');
          this.props.store.qiStore.saveSurveyLead({client_name: this.state.client_name,
                                                   client_contact: this.state.client_contact,
                                                   research_manager: this.state.research_manager,
                                                   survey_manager: this.state.survey_manager,
                                                   priority: this.state.priority,
                                                   title: this.state.title,
                                                   description: this.state.description
                                                 })
          this.setState({leadSaved:true})
          alert('I am saved!!!!')
      }
    });
  }

  _handleInputChange = (newValue: string) => {
    console.log('_handleInputChange:', newValue)
    return newValue;
  };

  _closeSnackBar = (event) => {
    this.setState({ snackBarOpen: false });
  };

  render() {
    return(
      <div className='container'>
        <Grid>
          <GridColumn medium={12}>
            <div style={{fontSize:18, fontWeight:900, marginTop: '1em'}}>Client Information</div>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={4}>
          <Field label="Client Name *" invalidMessage='You need to select a Client Name' isInvalid={this.state.clientNameInvalid}>
            <AsyncSelect
              onChange={this._handleClientNameChange.bind(this)}
              placeholder="Start typing Client Name"
              cacheOptions
              defaultOptions
              loadOptions={clientNameOptions}
            />
          </Field>
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={4}>
            <Field label="Client Contact *" invalidMessage='You need to select a Client Contact' isInvalid={this.state.clientContactInvalid}>
              <AsyncSelect
                onChange={this._handleClientContactChange.bind(this)}
                defaultOptions
                loadOptions={clientContactOptions}
                placeholder="Start typing Client Contact"
              />
            </Field>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={4}>
          <Field label="Research Manager *" invalidMessage='You need to select a Research Manager' isInvalid={this.state.researchManagerInvalid}>
            <AsyncSelect
              onChange={this._handleResearchManagerChange.bind(this)}
              defaultOptions
              loadOptions={researchManagerOptions}
              placeholder="Start typing Research Manager"
            />
          </Field>
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={4}>
            <Field label="Survey Manager *" invalidMessage='You need to select a Survey Manager' isInvalid={this.state.surveyManagerInvalid}>
              <AsyncSelect
                onChange={this._handleSurveyManagerChange.bind(this)}
                defaultOptions
                loadOptions={surveyManagerOptions}
                placeholder="Start typing Survey Manager"
              />
            </Field>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={9}>
            <div style={{fontSize:18, fontWeight:900, marginTop: '2em'}}>Survey Information</div>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={4}>
            <TextField
              onChange={this._handleChange.bind(this, 'title')}
              placeholder="Enter Survey Title"
              label="Survey Title"
              isInvalid = {this.state.titleInvalid}
              required
              shouldFitContainer
            />
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={4}>
            <SingleSelect
              items={priorities}
              label="Priority"
              defaultSelected={priorities[0].items[1]}
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={9}>
            <TextArea
              onChange={this._handleChange.bind(this, 'description')}
              required
              label="Project Description"
              isInvalid = {this.state.descriptionInvalid}
              placeholder="Enter Survey Description"
              shouldFitContainer
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={6}>
            <div style={{marginTop: '2em'}}>
              <Button
                appearance="primary"
                onClick={this._save.bind(this)}
                onClose={() => { }}
              >Save
              </Button>
            </div>
          </GridColumn>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Lead))
