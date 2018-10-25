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
    const tabs = [
      { label: 'QUOTE', route: '/surveyQuote'},
      { label: 'SETTINGS', route: '/surveySettings'},
      { label: 'INVITES', route: '/surveyInvites'},
      { label: 'PERFORMANCE', route: '/surveyPerformance'},
      { label: 'ACTIVITY', route: '/surveyActivity'},
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
