import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import TextField from '@atlaskit/field-text'
import TextArea from '@atlaskit/field-text-area'
import Button from '@atlaskit/button';
import SingleSelect from '@atlaskit/single-select';

const priorities = [
  {
    items: [
      { content: 'Low', value: 'Low' },
      { content: 'Medium', value: 'Medium' },
      { content: 'High', value: 'High' },
    ],
  },
];

class Quote extends Component {
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

  _handleClientNameChange(value) {
    console.log('handleClientNameChange: ', value);
    this.setState(
      { client_name: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleContactNameChange(value) {
    console.log('handleContactNameChange: ', value);
    this.setState(
      { client_contact: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleResearchManagerChange(value) {
    console.log('_handleResearchManagerChange: ', value);
    this.setState(
      { research_manager: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleSurveyManagerChange(value) {
    console.log('_handleSurveyManagerChange: ', value);
    this.setState(
      { survey_manager: value },
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

  _closeSnackBar = (event) => {
    this.setState({ snackBarOpen: false });
  };

  render() {
    const DropDown = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: 2.6em;
    `;
    const Quote = styled.div`
      display: flex;
      flex-direction: column;
      border: 0.2em solid #ddd;
      background-color: yellow;
    `;

    return(
      <div className='container'>
        <Grid>
          <GridColumn medium={9}>
            <div style={{fontSize:18, fontWeight:900, marginTop: '1em'}}>Client Information</div>
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={2}>
            <Quote>
              <div style={{fontSize:18, fontWeight:900, marginTop: '1em'}}>Quote Details</div>
              xxx vfjnskvlas vjsaklvjsakl vjsakjvs vjsaklvjs vjsaklkvjkl vsajklvj
            </Quote>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={4}>
            <TextField
              onChange={this._handleChange.bind(this, 'client_name')}
              placeholder="Start typing Client Name"
              label="Client Name "
              isInvalid = {this.state.clientNameInvalid}
              required
              shouldFitContainer
            />
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={4}>
            <TextField
              onChange={this._handleChange.bind(this, 'client_contact')}
              placeholder="Start typing Client Contact"
              label="Client Contact "
              isInvalid = {this.state.clientContactInvalid}
              required
              shouldFitContainer
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn medium={4}>
            <TextField
              onChange={this._handleChange.bind(this, 'research_manager')}
              placeholder="Start typing Research Manager"
              isInvalid = {this.state.researchManagerInvalid}
              required
              label="Client Name"
              shouldFitContainer
            />
          </GridColumn>
          <GridColumn medium={1}>
          </GridColumn>
          <GridColumn medium={4}>
            <TextField
              onChange={this._handleChange.bind(this, 'survey_manager')}
              placeholder="Start typing Survey Manager"
              label="Client Contact "
              isInvalid = {this.state.surveyManagerInvalid}
              required
              shouldFitContainer
            />
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
            <DropDown>
              <SingleSelect
                items={priorities}
                placeholder="Select Priority"
                noMatchesFound="Empty items"
                defaultSelected={priorities[0].items[1]}
              />
            </DropDown>
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

export default inject((allStores) => ({ ...allStores }))(observer(Quote))
