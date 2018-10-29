import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Tabs from '@atlaskit/tabs';

// Custom Styles
import '../css/qi.css'

class SurveyDetailsMenu extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    let prefix=''
    if (process.env.NODE_ENV === 'production')
      prefix = process.env.REACT_APP_MOUNT
    const tabs = [
      { label: 'QUOTE', route: `${prefix}/surveyQuote`},
      { label: 'SETTINGS', route: `${prefix}/surveySettings`},
      { label: 'INVITES', route: `${prefix}/surveyInvites`},
      { label: 'PERFORMANCE', route: `${prefix}/surveyPerformance`},
      { label: 'ACTIVITY', route: `${prefix}/surveyActivity`},
    ];
    let tab = this.props!=='undefined'?this.props.tab:'quote';
    console.log('tab: ', tab);

    return(
      <div style={{paddingBottom: '1em'}}>
        <Tabs
          tabs={tabs}
          onSelect={(tab, index) => {
            this.context.router.push(tabs[index].route)}
          }
        />
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SurveyDetailsMenu))
