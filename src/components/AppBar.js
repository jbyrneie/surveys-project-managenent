import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import { Route , withRouter} from 'react-router-dom';
import { browserHistory } from 'react-router';
import Button, { ButtonGroup } from '@atlaskit/button';

class AppBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
  }

  _surveyLead(event) {
    console.log('New Survey clicked....');
    this.context.router.push('/lead')
  }

  render() {
    console.log('AppBar render.....');
    return(
      <div className='container, appBar'>
        <div>
          <span className='appBarTitle'>{this.props.title}</span>
          {this.props.newSurvey?
            <div className='navBar'>
              <div className='appBarButton'>
                <Button
                  appearance="primary"
                  onClick={this._surveyLead.bind(this)}
                  onClose={() => { }}
                >New Lead
                </Button>
              </div>
            </div>
            :
            null
          }
        </div>
        {this.props.subTitle?
          <div>
            <span className='appBarSubTitle'>{this.props.subTitle}</span>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default AppBar
