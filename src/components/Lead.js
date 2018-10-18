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

const filterCities = (inputValue: string) =>
  cities.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log('promiseOptions: ', inputValue);
      resolve(filterCities(inputValue));
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

const clientContact: Array<{ label: string, value: any }> = [
  { label: 'Adelaide', value: 'adelaide', extra: 'extra' },
  { label: 'Brisbane1', value: 'brisbane1' },
  { label: 'Brisbane2', value: 'brisbane2' },
  { label: 'Brisbane3', value: 'brisbane3' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const cities: Array<{ label: string, value: any }> = [
  { label: 'Adelaide', value: 'adelaide', extra: 'extra' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Brisbane1', value: 'brisbane1' },
  { label: 'Brisbane2', value: 'brisbane2' },
  { label: 'Brisbane3', value: 'brisbane3' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const clientContact1 = [
  {
    items: [
      { content: 'Adam1', value: 'Adam1' },
      { content: 'Adam2', value: 'Adam2' },
      { content: 'Adaaa', value: 'Adaaa' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' },
      { content: 'Jack1', value: 'Jack1' }
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
    console.log('handleInputChangexxx: ', inputValue);
    return inputValue;
  };

  _getClientSuggestions(value) {
    console.log('_getClientSuggestions: ', value);
    //return getClientSuggestions(value)
  }

  _getContactSuggestions(value) {
    console.log('_getContactSuggestions: ', value);
    //return getContactSuggestions(value)
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
    console.log('_validate client: %s contact: %s',this.state.client_name, this.state.client_contact);

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
              loadOptions={promiseOptions}
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
                loadOptions={promiseOptions}
                options={cities}
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
              loadOptions={promiseOptions}
              options={cities}
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
                loadOptions={promiseOptions}
                options={cities}
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
