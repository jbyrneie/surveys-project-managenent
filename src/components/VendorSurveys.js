import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Button, { ButtonGroup } from '@atlaskit/button';
import VendorSurveysByCategory from './VendorSurveysByCategory';
import VendorSurveysBySurvey from './VendorSurveysBySurvey';
import PageTitle from './PageTitle';
import _ from 'lodash';
import {STATUS} from '../lib/utils'

class VendorsSurveys extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  render() {
    return (
      <div>
        <VendorSurveysByCategory />
        <VendorSurveysBySurvey />
      </div>
    );
  }
}
export default inject((allStores) => ({ ...allStores }))(observer(VendorsSurveys))
