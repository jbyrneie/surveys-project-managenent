import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components';
import { themed } from '@atlaskit/theme';
import Button, { themeNamespace } from '@atlaskit/button';

class AppBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  _surveyLead(event) {
    console.log('New Survey clicked....');
    let prefix=''
    if (process.env.NODE_ENV === 'production')
      prefix = process.env.REACT_APP_MOUNT
    this.context.router.push(`${prefix}/lead`)
  }

  render() {
    console.log('AppBar render.....');
    const theme = {
      primary: {
        background: {
          default: themed({ light: '#27c972'}),
        },
      },
    };

    return(
      <div className='container, appBar'>
        <div>
          <span className='appBarTitle'>{this.props.title}</span>
          {this.props.newSurvey?
            <div className='navBar'>
              <div className='appBarButton'>
                <ThemeProvider theme={{ [themeNamespace]: theme }}>
                  <Button
                    appearance="primary"
                    onClick={this._surveyLead.bind(this)}
                    onClose={() => { }}
                  >New Lead
                  </Button>
                </ThemeProvider>
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
