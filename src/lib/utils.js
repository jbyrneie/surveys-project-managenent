import React from 'react'
import moment from 'moment'
import views from  '../views'
import _ from 'lodash'

export const STATUS = {LEAD:10, QUOTE:11, PROGRAMMING:12, FEASABILITY:13, FIELDING:14}

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
      return {label: 'LEAD', color: 'red'}
    case STATUS.QUOTE:
      return {label: 'QUOTE', color: 'orange'}
    case STATUS.PROGRAMMING:
      return {label: 'PROGRAMMING', color: 'lightgrey'}
    case STATUS.FEASABILITY:
      return {label: 'FEASABILITY', color: 'blue'}
    case STATUS.FIELDING:
      return {label: 'FIELDING', color: 'indigo'}
    default:
      return {label: 'UNKNOWN', color: 'violet'}
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

export function navigate(route, event) {
  console.log('navigate clicked');
  this.context.router.push(route)
}

export function surveyDetails(index, surveys, event) {
  console.log('surveyDetails: %s %s', index, JSON.stringify(surveys[index]));
  this.props.store.qiStore.setSelectedSurvey(surveys[index])
  this.context.router.push('/surveyDetails')
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
