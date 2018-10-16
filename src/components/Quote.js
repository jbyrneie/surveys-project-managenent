import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Grid, GridColumn } from '@atlaskit/page';
import styled from 'styled-components';
import TextField from '@atlaskit/field-text'
import TextArea from '@atlaskit/field-text-area'
import Button from '@atlaskit/button';
import {
  DropdownMenuStateless,
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '@atlaskit/dropdown-menu';
//import TypeAhead from './TypeAhead'
//import { getClientSuggestions, getContactSuggestions } from '../lib/suggestions'

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
    };
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
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
    this.setState({
      [name]: event.target.value,
      valid: this._validate()
    });
  };

  _validate() {
    console.log('_validate client: %s contact: %s',this.state.client_name, this.state.client_contact);
    this.setState({
      clientNameInvalid:this.state.client_name?false:true,
      clientContactInvalid:this.state.client_contact?false:true,
      researchManagerInvalid:this.state.research_manager?false:true,
      surveyManagerInvalid:this.state.survey_manager?false:true,
      titleInvalid:this.state.title?false:true,
      descriptionInvalid:this.state.description?false:true,
    })
  }

  _save(event) {
    console.log('save called: ', this.state.title);
    this._validate()
    /*
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
      this.setState({leadSaved:true, projectDescriptionInvalid:true}
    }
    */
  }

  _closeSnackBar = (event) => {
    this.setState({ snackBarOpen: false });
  };

  render() {

    return(
      <div className='container'>
        <Grid>
          <GridColumn>
            <div style={{fontSize:18, fontWeight:900, marginTop: '1em'}}>Client Information</div>
            <div>
              <div style={{marginRight: '5em', display: 'inline-block'}}>
                <TextField
                  onChange={this._handleChange.bind(this, 'client_name')}
                  placeholder="Start typing Client Name"
                  label="Client Name "
                  isInvalid = {this.state.clientNameInvalid}
                  required
                />
              </div>
              <div style={{marginLeft: '5em', marginTop:'0.5em', display: 'inline-block'}}>
                <TextField
                  onChange={this._handleChange.bind(this, 'client_contact')}
                  placeholder="Start typing Client Contact"
                  label="Client Contact "
                  isInvalid = {this.state.clientContactInvalid}
                  required
                />
              </div>
            </div>
            <div style={{marginTop: '0.5em'}}>
              <div style={{marginRight: '5em', display: 'inline-block'}}>
                <TextField
                  onChange={this._handleChange.bind(this, 'research_manager')}
                  placeholder="Start typing Research Manager"
                  isInvalid = {this.state.researchManagerInvalid}
                  required
                  label="Client Name "
                />
              </div>
              <div style={{marginLeft: '5em', marginTop:'0.5em', display: 'inline-block'}}>
                <TextField
                  onChange={this._handleChange.bind(this, 'survey_manager')}
                  placeholder="Start typing Survey Manager"
                  label="Client Contact "
                  isInvalid = {this.state.surveyManagerInvalid}
                  required
                />
              </div>
            </div>
            <div style={{fontSize:18, fontWeight:900, marginTop: '3em'}}>Survey Information</div>
            <div>
              <div style={{marginTop:'0.5em', display: 'inline-block'}}>
                <TextField
                  onChange={this._handleChange.bind(this, 'title')}
                  placeholder="Enter Survey Title"
                  label="Survey Title "
                  isInvalid = {this.state.titleInvalid}
                  required
                />
              </div>
              <div style={{marginLeft: '5em', marginTop:'2.5em', display: 'inline-block'}}>
                <DropdownMenuStateless
                  isOpen={this.state.isPriorityDropdownOpen}
                  onOpenChange={attrs => {
                    this.setState({ isPriorityDropdownOpen: attrs.isOpen });
                  }}
                  onSelect={this._handlePriorityChange('priority')}
                  trigger="Medium"
                  triggerType="button"
                  isMenuFixed
                >
                  <DropdownItemGroupRadio id="status">
                  <DropdownItemRadio
                    id={'Low'}
                  >'Low'</DropdownItemRadio>
                    <DropdownItemRadio
                      id={'Medium'}
                    >'Medium'</DropdownItemRadio>
                    <DropdownItemRadio
                      id={'High'}
                    >'High'</DropdownItemRadio>
                  </DropdownItemGroupRadio>
                </DropdownMenuStateless>
              </div>
              <div style={{marginTop:'1em'}}>
                <TextArea
                  required
                  label="Project Description"
                  isInvalid = {this.state.descriptionInvalid}
                  placeholder="Enter Survey Description"
                />
              </div>
            </div>
            <div style={{marginTop:'1.5em'}}>
              <Button
                appearance="primary"
                onClick={this._save.bind(this)}
                onClose={() => { }}
              >Save
              </Button>
            </div>
          </GridColumn>
          <GridColumn>
            <div style={{fontSize:18, fontWeight:900, marginTop: '1em'}}>Quote Details</div>
            <div>
              All the Quote Info here
            </div>
          </GridColumn>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Quote))
