import deburr from 'lodash/deburr';

const client_suggestions = [
  { label: 'A1 Mountain Funds', value: '1'},
  { label: 'A2 Mountain Funds', value: '1'},
  { label: 'A3 Mountain Funds', value: '1'},
  { label: 'A4 Mountain Funds', value: '1'},
  { label: 'A5 Mountain Funds', value: '1'},
  { label: 'B1 Mountain Funds', value: '1'},
  { label: 'b2 Mountain Funds', value: '1'},
  { label: 'b3 Mountain Funds', value: '1'},
  { label: 'Blue Mountain Funds', value: '1'},
  { label: 'Clear Mountain Funds', value: '1'},
  { label: 'Dark Mountain Funds', value: '1'},
  { label: 'Every Mountain Funds', value: '1'},
  { label: 'Fine Mountain Funds', value: '1'},
  { label: 'Glorious Mountain Funds', value: '1'},
  { label: 'High Mountain Funds', value: '1'},
  { label: 'Ignite Mountain Funds', value: '1'},
  { label: 'Java Mountain Funds', value: '1'},
  { label: 'Kape Mountain Funds', value: '1'},
  { label: 'Long Mountain Funds', value: '1'},
  { label: 'Mountain Funds', value: '1'},
  { label: 'New Mountain Funds', value: '1'},
  { label: 'Old Mountain Funds', value: '1'},
  { label: 'Pure Mountain Funds', value: '1'},
  { label: 'Quiet Mountain Funds', value: '1'},
  { label: 'Real Mountain Funds', value: '1'},
  { label: 'Silent Mountain Funds', value: '1'},
  { label: 'True Mountain Funds', value: '1'},
  { label: 'Up Mountain Funds', value: '1'},
  { label: 'Very Mountain Funds', value: '1'},
  { label: 'White Mountain Funds', value: '1'},
  { label: 'Xylon Mountain Funds', value: '1'},
  { label: 'Zebra Mountain Funds', value: '1'},
];

const contact_suggestions = [
  { label: 'Adam', value:'1'},
  { label: 'Andrew', value:'1'},
  { label: 'Alfonsis', value:'1'},
  { label: 'Brian', value:'1'},
  { label: 'Brendan', value:'1'},
  { label: 'Jack', value:'1'},
  { label: 'James', value:'1'},
  { label: 'John', value:'1'},
];

const rm_suggestions = [
  { label: 'Adam RM', value:'1'},
  { label: 'Andrew RM', value:'1'},
  { label: 'Alfonsis RM', value:'1'},
  { label: 'Brian RM', value:'1'},
  { label: 'Brendan RM', value:'1'},
  { label: 'Jack RM', value:'1'},
  { label: 'James RM', value:'1'},
  { label: 'John RM', value:'1'},
];

function _getClientSuggestions(value) {
  console.log('getClientSuggestions: ', value);
  return client_suggestions.filter(i => i.label.toLowerCase().includes(value.toLowerCase()));
}

function _getContactSuggestions(value) {
  console.log('getContactSuggestions: ', value);
  return contact_suggestions.filter(i => i.label.toLowerCase().includes(value.toLowerCase()));
}

function _getRMSuggestions(value) {
  console.log('getRMSuggestions: ', value);
  const rms = value===undefined?rm_suggestions:rm_suggestions.filter(i => i.label.toLowerCase().includes(value.toLowerCase()));
  console.log('RMs: %s', JSON.stringify(rms))
  return rms
}

export const researchManagerOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(_getRMSuggestions(inputValue));
    }, 1000);
  });

export const surveyManagerOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(_getRMSuggestions(inputValue));
    }, 1000);
  });

export const clientNameOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(_getClientSuggestions(inputValue));
    }, 1000);
  });

export const clientContactOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      const contacts = _getContactSuggestions(inputValue)
      console.log('clientContactOptions: ', JSON.stringify(contacts))
      resolve(_getContactSuggestions(inputValue));
    }, 1000);
  });
