import React from 'react'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import views from  '../views'
import _ from 'lodash'

function _getColorFromStatus(status) {
  switch(status) {
    case 10:
      return green[500]
    case 11:
      return blue[500]
    case 12:
      return yellow[500]
    case 13:
      return red[500]
    case 14:
      return teal[500]
    default:
      return orange[500]
  }
}

export const STATUS = {LEAD:10, QUOTE:11, PROGRAMMING:12, FEASABILITY:13, FIELDING:14}
export const STATUS_TO_STRING = {10:'LEAD', 11:'QUOTE', 12:'PROGRAMMING', 13:'FEASABILITY', 14:'FIELDING'}

export function getAppearanceFromStatus(status) {
  switch(status) {
    case 10:
      return 'success'
    case 11:
      return 'inprogress'
    case 12:
      return 'new'
    case 13:
      return 'moved'
    case 14:
      return 'new' 
    default:
      return 'default'
  }
}

export function daysLeft(endDate) {
  const now = moment(new Date()); //todays date
  var end = moment(endDate); // end date
  const duration = moment.duration(end.diff(now));
  const days = duration.asDays() + 1
  return Math.round(days>=0?days:0)
}

export function daysDuration(startDate) {
  const now = moment(new Date()); //todays date
  var start = moment(startDate); // end date
  const duration = moment.duration(now.diff(start));
  const days = duration.asDays() + 1
  return Math.round(days)
}

export function mapStatusToString(status) {
  switch(status) {
    case STATUS.LEAD:
      return 'Lead'
    case STATUS.QUOTE:
      return 'Quote'
    case STATUS.PROGRAMMING:
      return 'Programming'
    case STATUS.FEASABILITY:
      return 'Feasability'
    case STATUS.FIELDING:
      return 'Fielding'
    default:
      return 'unknown'
  }
}

export function mapStatusToAction(status) {
  switch(status) {
    case STATUS.LEAD:
      return 'Feasability | Quote'
    case STATUS.QUOTE:
      return 'Programming'
    case STATUS.PROGRAMMING:
      return 'Fielding'
    case STATUS.FEASABILITY:
      return 'Programming'
    case STATUS.FIELDING:
      return 'Close Out'
    default:
      return 'unknown'
  }
}

export function statusButton(status) {
  return(<Button
            variant="extendedFab"
            size="small"
            color="primary"
            style={{fontSize: 12,
                    textTransform: 'none',
                    paddingLeft: 20,
                    paddingRight: 20,
                    minWidth: 150,
                    height: 30,
                    backgroundColor: _getColorFromStatus(status)
                  }}
          >
            {mapStatusToString(status)}
        </Button>)
}

export function navigate(route, event) {
  console.log('navigate clicked');
  const {router: {goTo}} = this.props.store
  goTo(views[route], {}, this.props.store)
}

export function surveyDetails(index, surveys, event) {
  console.log('surveyDetails: %s %s', index, JSON.stringify(surveys[index]));
  this.props.store.qiStore.setSelectedSurvey(surveys[index])
  const {router: {goTo}} = this.props.store
  goTo(views.surveyDetails, {}, this.props.store.selectedSurvey)
}

export function taskTitle(title, num) {
  return(
    <span>{title}
      <span className="bubble">{num}</span>
    </span>
  )
}

export function asigneesAbbreviation(asignees) {
  let abbreviations = ''
  _.forEach(asignees, function(asignee) {//abbreviations += asignee?asignee.first_name[0]:null + asignee?asignee.last_name[0]:null + ','
    abbreviations += `${asignee&&asignee.first_name?asignee.first_name[0]:null}${asignee&&asignee.last_name?asignee.last_name[0]:null},`
  });
  return abbreviations.substring(0, abbreviations.length - 1)
}
